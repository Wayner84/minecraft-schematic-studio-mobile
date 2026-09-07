package com.waynetownsend.minecraftschematicstudio;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.Toast;
import android.util.Base64;
import android.util.Log;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.UUID;

@CapacitorPlugin(name = "AndroidFileSaver")
public class AndroidFileSaverPlugin extends Plugin {
    private static final String TAG = "AndroidFileSaver";
    static final String PENDING_FILE_PREFIX = "android-file-saver-";
    static final String PENDING_FILE_SUFFIX = ".bin";
    private static final String PREFERENCES_NAME = "AndroidFileSaver";
    private static final String PREF_ACTIVE_PENDING_FILE = "activePendingFile";
    private boolean saveInProgress;

    @Override
    protected void restoreState(Bundle state) {
        saveInProgress = true;
    }

    @PluginMethod
    public synchronized void saveFile(PluginCall call) {
        String filename = call.getString("filename");
        String mimeType = call.getString("mimeType", "application/octet-stream");
        String base64Data = call.getString("base64Data");

        if (filename == null || filename.trim().isEmpty()) {
            call.reject("Missing filename");
            return;
        }
        if (base64Data == null || base64Data.isEmpty()) {
            call.reject("Missing file data");
            return;
        }
        if (saveInProgress) {
            call.reject("Another save is already in progress");
            return;
        }
        // Callback IDs become -1 on restore. Persist a unique payload identity instead.
        // A fresh launch can supersede a stale marker without deleting its recovery payload.
        File pendingFile = new File(getContext().getCacheDir(), pendingFileName(UUID.randomUUID().toString()));
        try {
            byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
            if (bytes.length == 0) {
                call.reject("File data decoded to zero bytes");
                return;
            }

            try (FileOutputStream tempOutputStream = new FileOutputStream(pendingFile, false)) {
                tempOutputStream.write(bytes);
                tempOutputStream.flush();
            }

            // The document picker is a separate Android activity. Keep only the callback id in the
            // saved PluginCall and persist the payload in cache so the callback can still write the
            // bytes if Capacitor recreates the plugin/call while the picker is open.
            call.getData().remove("base64Data");
            call.getData().put("pendingFileName", pendingFile.getName());
            if (!setActivePendingFileName(pendingFile.getName())) {
                deleteQuietly(pendingFile);
                call.reject("Could not persist save state");
                return;
            }
            Log.i(TAG, "Prepared " + pendingFile.length() + " bytes for " + filename);
        } catch (IllegalArgumentException ex) {
            deleteQuietly(pendingFile);
            call.reject("Invalid file data", ex);
            return;
        } catch (Exception ex) {
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile.getName());
            call.reject("Could not prepare file data", ex);
            return;
        }

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType);
        intent.putExtra(Intent.EXTRA_TITLE, filename);
        intent.putExtra("android.provider.extra.SHOW_ADVANCED", true);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);

        try {
            saveInProgress = true;
            startActivityForResult(call, intent, "saveFileResult");
        } catch (Exception ex) {
            saveInProgress = false;
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile.getName());
            call.reject("Could not open document picker. Please try saving again.", ex);
        }
    }

    @ActivityCallback
    private synchronized void saveFileResult(PluginCall call, ActivityResult result) {
        saveInProgress = false;
        if (call == null) {
            // Capacitor loses the original PluginCall if Android reclaims the app process while the
            // system document picker is in the foreground (common under memory pressure, especially
            // for larger exports). The SAF document has already been created on disk by this point, so
            // without recovery the user is left with a real, silently empty file and no error shown.
            recoverOrphanedSave(result);
            return;
        }

        File pendingFile = getPendingFile(call);
        if (!pendingFile.exists() || pendingFile.length() == 0) {
            deleteResultDocumentIfPresent(result);
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile.getName());
            restoredNotice(call, "Save failed: prepared data is missing. Keep the original design and export again.");
            call.reject("Missing prepared file data");
            return;
        }

        if (result == null || result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile.getName());
            call.reject("Save cancelled");
            return;
        }

        Uri uri = result.getData().getData();
        long bytesWritten;
        try {
            bytesWritten = writePendingFileToUri(pendingFile, uri);
        } catch (Exception ex) {
            deleteResultDocument(uri);
            restoredNotice(call, "Save failed. Please export the design again.");
            call.reject("Could not save file", ex);
            return;
        } finally {
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile.getName());
        }

        if (bytesWritten == 0) {
            deleteResultDocument(uri);
            call.reject("Saved file was empty");
            return;
        }

        Log.i(TAG, "Saved " + bytesWritten + " bytes to " + uri);
        JSObject ret = new JSObject();
        ret.put("uri", uri.toString());
        ret.put("bytesWritten", bytesWritten);
        call.resolve(ret);
        restoredNotice(call, "Recovered save completed");
    }

    private void restoredNotice(PluginCall call, String message) {
        if (call == null || PluginCall.CALLBACK_ID_DANGLING.equals(call.getCallbackId())) {
            new Handler(Looper.getMainLooper()).post(() -> Toast.makeText(getContext(), message, Toast.LENGTH_LONG).show());
        }
    }

    private void recoverOrphanedSave(ActivityResult result) {
        if (result == null || result.getResultCode() != Activity.RESULT_OK
            || result.getData() == null || result.getData().getData() == null) {
            File pendingFile = getActivePendingFile();
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile == null ? null : pendingFile.getName());
            return;
        }

        Uri uri = result.getData().getData();
        File pendingFile = getActivePendingFile();
        if (pendingFile == null) {
            Log.w(TAG, "Could not safely match orphaned save to its active pending file");
            deleteResultDocument(uri);
            restoredNotice(null, "Save failed: no matching prepared data. Please export again.");
            return;
        }

        long bytesWritten = 0;
        try {
            bytesWritten = writePendingFileToUri(pendingFile, uri);
        } catch (Exception ex) {
            Log.w(TAG, "Could not recover orphaned save", ex);
        } finally {
            deleteQuietly(pendingFile);
            clearActivePendingFileName(pendingFile.getName());
        }

        if (bytesWritten == 0) {
            deleteResultDocument(uri);
            restoredNotice(null, "Save recovery failed. Please export again.");
        } else {
            Log.i(TAG, "Recovered orphaned save: wrote " + bytesWritten + " bytes to " + uri);
            restoredNotice(null, "Recovered save completed");
        }
    }

    private long writePendingFileToUri(File pendingFile, Uri uri) throws IOException {
        long bytesWritten = 0;
        try (FileInputStream inputStream = new FileInputStream(pendingFile);
             OutputStream outputStream = getContext().getContentResolver().openOutputStream(uri, "rwt")) {
            if (outputStream == null) throw new IOException("Could not open selected file");

            byte[] buffer = new byte[64 * 1024];
            int read;
            while ((read = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, read);
                bytesWritten += read;
            }
            outputStream.flush();
        }
        return bytesWritten;
    }

    private File getPendingFile(PluginCall call) {
        return new File(getContext().getCacheDir(), resolvePendingFileName(call.getCallbackId(),
            call.getString("pendingFileName"), getPreferences().getString(PREF_ACTIVE_PENDING_FILE, null)));
    }

    static String resolvePendingFileName(String callbackId, String persistedName, String activeName) {
        if (isPendingFileName(persistedName)) return persistedName;
        if (PluginCall.CALLBACK_ID_DANGLING.equals(callbackId) && isPendingFileName(activeName)) return activeName;
        return pendingFileName(callbackId);
    }

    static String pendingFileName(String callbackId) {
        return PENDING_FILE_PREFIX + sanitizeForFilename(callbackId) + PENDING_FILE_SUFFIX;
    }

    static String sanitizeForFilename(String raw) {
        return (raw == null ? "" : raw).replaceAll("[^A-Za-z0-9._-]", "_");
    }

    private File getActivePendingFile() {
        String fileName = getPreferences().getString(PREF_ACTIVE_PENDING_FILE, null);
        if (!isPendingFileName(fileName)) {
            clearActivePendingFileName(fileName);
            return null;
        }
        File pendingFile = new File(getContext().getCacheDir(), fileName);
        if (!pendingFile.exists() || pendingFile.length() == 0) {
            clearActivePendingFileName(fileName);
            return null;
        }
        return pendingFile;
    }

    static boolean isPendingFileName(String fileName) {
        return fileName != null
            && fileName.startsWith(PENDING_FILE_PREFIX)
            && fileName.endsWith(PENDING_FILE_SUFFIX)
            && fileName.indexOf('/') == -1
            && fileName.indexOf('\\') == -1;
    }

    private SharedPreferences getPreferences() {
        return getContext().getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE);
    }

    private boolean setActivePendingFileName(String fileName) {
        return getPreferences().edit().putString(PREF_ACTIVE_PENDING_FILE, fileName).commit();
    }

    private void clearActivePendingFileName(String expectedFileName) {
        String activeFileName = getPreferences().getString(PREF_ACTIVE_PENDING_FILE, null);
        if (expectedFileName == null || expectedFileName.equals(activeFileName)) {
            getPreferences().edit().remove(PREF_ACTIVE_PENDING_FILE).commit();
        }
    }

    private void deleteResultDocumentIfPresent(ActivityResult result) {
        if (result == null || result.getData() == null || result.getData().getData() == null) return;
        deleteResultDocument(result.getData().getData());
    }

    private void deleteResultDocument(Uri uri) {
        try {
            getContext().getContentResolver().delete(uri, null, null);
        } catch (Exception ex) {
            Log.w(TAG, "Could not delete failed save placeholder", ex);
        }
    }

    private void deleteQuietly(File file) {
        try {
            if (file != null && file.exists() && !file.delete()) {
                Log.w(TAG, "Could not delete temporary file " + file.getAbsolutePath());
            }
        } catch (Exception ex) {
            Log.w(TAG, "Could not delete temporary file", ex);
        }
    }
}

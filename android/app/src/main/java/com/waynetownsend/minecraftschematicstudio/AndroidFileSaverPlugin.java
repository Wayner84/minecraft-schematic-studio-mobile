package com.waynetownsend.minecraftschematicstudio;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
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
import java.io.OutputStream;

@CapacitorPlugin(name = "AndroidFileSaver")
public class AndroidFileSaverPlugin extends Plugin {
    private static final String TAG = "AndroidFileSaver";

    @PluginMethod
    public void saveFile(PluginCall call) {
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

        File pendingFile = getPendingFile(call);
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
            Log.i(TAG, "Prepared " + pendingFile.length() + " bytes for " + filename);
        } catch (IllegalArgumentException ex) {
            deleteQuietly(pendingFile);
            call.reject("Invalid file data", ex);
            return;
        } catch (Exception ex) {
            deleteQuietly(pendingFile);
            call.reject("Could not prepare file data", ex);
            return;
        }

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType);
        intent.putExtra(Intent.EXTRA_TITLE, filename);
        intent.putExtra("android.provider.extra.SHOW_ADVANCED", true);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION);

        startActivityForResult(call, intent, "saveFileResult");
    }

    @ActivityCallback
    private void saveFileResult(PluginCall call, ActivityResult result) {
        if (call == null) return;

        File pendingFile = getPendingFile(call);
        if (!pendingFile.exists() || pendingFile.length() == 0) {
            deleteResultDocumentIfPresent(result);
            call.reject("Missing prepared file data");
            return;
        }

        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            deleteQuietly(pendingFile);
            call.reject("Save cancelled");
            return;
        }

        Uri uri = result.getData().getData();
        long bytesWritten = 0;

        try (FileInputStream inputStream = new FileInputStream(pendingFile);
             OutputStream outputStream = getContext().getContentResolver().openOutputStream(uri, "w")) {
            if (outputStream == null) {
                deleteResultDocument(uri);
                call.reject("Could not open selected file");
                return;
            }

            byte[] buffer = new byte[64 * 1024];
            int read;
            while ((read = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, read);
                bytesWritten += read;
            }
            outputStream.flush();
        } catch (Exception ex) {
            deleteResultDocument(uri);
            call.reject("Could not save file", ex);
            return;
        } finally {
            deleteQuietly(pendingFile);
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
    }

    private File getPendingFile(PluginCall call) {
        String safeCallbackId = call.getCallbackId().replaceAll("[^A-Za-z0-9._-]", "_");
        return new File(getContext().getCacheDir(), "android-file-saver-" + safeCallbackId + ".bin");
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

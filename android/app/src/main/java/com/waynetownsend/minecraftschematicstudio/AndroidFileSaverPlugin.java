package com.waynetownsend.minecraftschematicstudio;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Base64;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.OutputStream;
import java.util.HashMap;
import java.util.Map;

@CapacitorPlugin(name = "AndroidFileSaver")
public class AndroidFileSaverPlugin extends Plugin {
    private final Map<String, byte[]> pendingFileBytes = new HashMap<>();

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

        byte[] bytes;
        try {
            bytes = Base64.decode(base64Data, Base64.DEFAULT);
        } catch (IllegalArgumentException ex) {
            call.reject("Invalid file data", ex);
            return;
        }
        if (bytes.length == 0) {
            call.reject("File data decoded to zero bytes");
            return;
        }

        pendingFileBytes.put(call.getCallbackId(), bytes);

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType(mimeType);
        intent.putExtra(Intent.EXTRA_TITLE, filename);
        intent.putExtra("android.provider.extra.SHOW_ADVANCED", true);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);

        startActivityForResult(call, intent, "saveFileResult");
    }

    @ActivityCallback
    private void saveFileResult(PluginCall call, ActivityResult result) {
        if (call == null) return;

        byte[] bytes = pendingFileBytes.remove(call.getCallbackId());
        if (bytes == null || bytes.length == 0) {
            call.reject("Missing prepared file data");
            return;
        }

        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            call.reject("Save cancelled");
            return;
        }

        Uri uri = result.getData().getData();

        try (OutputStream outputStream = getContext().getContentResolver().openOutputStream(uri, "rwt")) {
            if (outputStream == null) {
                call.reject("Could not open selected file");
                return;
            }
            outputStream.write(bytes);
            outputStream.flush();

            JSObject ret = new JSObject();
            ret.put("uri", uri.toString());
            ret.put("bytesWritten", bytes.length);
            call.resolve(ret);
        } catch (Exception ex) {
            call.reject("Could not save file", ex);
        }
    }
}

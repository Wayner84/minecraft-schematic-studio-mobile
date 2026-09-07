package com.waynetownsend.minecraftschematicstudio;

import static org.junit.Assert.*;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import androidx.activity.result.ActivityResult;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import java.io.File;
import java.lang.reflect.Method;
import java.nio.file.Files;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 28, manifest = Config.NONE)
public class AndroidFileSaverLifecycleTest {
    static class Saver extends AndroidFileSaverPlugin {
        boolean launchFails;
        @Override public Context getContext() { return RuntimeEnvironment.getApplication(); }
        @Override public void startActivityForResult(PluginCall call, Intent intent, String name) {
            if (launchFails) throw new IllegalStateException("no document picker");
        }
    }
    static class Call extends PluginCall {
        String error;
        JSObject result;
        Call(String id, JSObject data) { super(null, "AndroidFileSaver", id, "saveFile", data); }
        @Override public void reject(String message) { error = message; }
        @Override public void reject(String message, Exception ex) { error = message; }
        @Override public void resolve(JSObject data) { result = data; }
    }
    Saver saver;
    @Before public void setup() {
        saver = new Saver();
        saver.getContext().getSharedPreferences("AndroidFileSaver", 0).edit().clear().commit();
    }
    Call prepare() {
        JSObject data = new JSObject(); data.put("filename", "test.json"); data.put("base64Data", "aGVsbG8=");
        Call call = new Call("42", data); saver.saveFile(call); return call;
    }
    void result(Saver plugin, Call call, ActivityResult result) throws Exception {
        Method method = AndroidFileSaverPlugin.class.getDeclaredMethod("saveFileResult", PluginCall.class, ActivityResult.class);
        method.setAccessible(true); method.invoke(plugin, call, result);
    }
    String active() { return saver.getContext().getSharedPreferences("AndroidFileSaver", 0).getString("activePendingFile", null); }
    @Test public void restoredDanglingCallWritesOriginalBytes() throws Exception {
        Call original = prepare();
        assertNull(original.error);
        assertFalse(original.getData().has("base64Data"));
        File output = File.createTempFile("saved", ".json", saver.getContext().getCacheDir());
        Call restored = new Call("-1", new JSObject(original.getData().toString()));
        result(new Saver(), restored, new ActivityResult(Activity.RESULT_OK, new Intent().setData(Uri.fromFile(output))));
        assertNull(restored.error);
        assertEquals("hello", new String(Files.readAllBytes(output.toPath()), java.nio.charset.StandardCharsets.UTF_8));
        assertEquals(5L, restored.result.getLong("bytesWritten"));
        assertNull(active());
    }
    @Test public void cancellationClearsFileAndMarker() throws Exception {
        Call call = prepare(); File pending = new File(saver.getContext().getCacheDir(), active());
        result(saver, call, new ActivityResult(Activity.RESULT_CANCELED, null));
        assertFalse(pending.exists()); assertNull(active()); assertEquals("Save cancelled", call.error);
    }
    @Test public void orphanCancellationClearsFileAndMarker() throws Exception {
        prepare(); File pending = new File(saver.getContext().getCacheDir(), active());
        result(new Saver(), null, new ActivityResult(Activity.RESULT_CANCELED, null));
        assertFalse(pending.exists()); assertNull(active());
    }
    @Test public void launchFailureDoesNotWedgeFutureSaves() {
        saver.launchFails = true;
        Call call = prepare(); assertNotNull(call.error); assertNull(active());
        saver.launchFails = false; assertNull(prepare().error);
    }
    @Test public void concurrentSaveCannotReplacePendingBytes() {
        Call first = prepare(); String name = active(); Call second = prepare();
        assertNull(first.error); assertNotNull(second.error); assertEquals(name, active());
    }
}

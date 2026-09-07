package com.waynetownsend.minecraftschematicstudio;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Covers the pure file-bookkeeping logic used to recover a save when Android reclaims the
 * app process while the document picker is open (see AndroidFileSaverPlugin#saveFileResult).
 * The rest of the plugin depends on an Android Context/ContentResolver and isn't unit-testable
 * without an instrumentation harness.
 */
public class AndroidFileSaverPluginTest {

    @Test
    public void restoredCall_usesPersistedPayloadInsteadOfDanglingCallbackId() {
        assertEquals("android-file-saver-call_42.bin", AndroidFileSaverPlugin.resolvePendingFileName("-1", "android-file-saver-call_42.bin", null));
        assertEquals("android-file-saver-call_42.bin", AndroidFileSaverPlugin.resolvePendingFileName("-1", null, "android-file-saver-call_42.bin"));
        assertEquals("android-file-saver-new.bin", AndroidFileSaverPlugin.resolvePendingFileName("new", null, "android-file-saver-old.bin"));
        assertEquals("android-file-saver-new.bin", AndroidFileSaverPlugin.resolvePendingFileName("new", "../../bad", null));
    }

    @Test
    public void sanitizeForFilename_stripsUnsafeCharacters() {
        assertEquals("abc_123_-.", AndroidFileSaverPlugin.sanitizeForFilename("abc/123:-."));
    }

    @Test
    public void sanitizeForFilename_handlesNull() {
        assertEquals("", AndroidFileSaverPlugin.sanitizeForFilename(null));
    }

    @Test
    public void pendingFileName_includesSanitizedCallbackId() {
        String name = AndroidFileSaverPlugin.pendingFileName("call/42");
        assertEquals(AndroidFileSaverPlugin.PENDING_FILE_PREFIX + "call_42" + AndroidFileSaverPlugin.PENDING_FILE_SUFFIX, name);
    }

    @Test
    public void isPendingFileName_acceptsOnlySafePendingFileNames() {
        assertTrue(AndroidFileSaverPlugin.isPendingFileName("android-file-saver-call_42.bin"));
        assertEquals(false, AndroidFileSaverPlugin.isPendingFileName(null));
        assertEquals(false, AndroidFileSaverPlugin.isPendingFileName("other-call_42.bin"));
        assertEquals(false, AndroidFileSaverPlugin.isPendingFileName("android-file-saver-call_42.tmp"));
        assertEquals(false, AndroidFileSaverPlugin.isPendingFileName("android-file-saver-../call.bin"));
        assertEquals(false, AndroidFileSaverPlugin.isPendingFileName("android-file-saver-..\\call.bin"));
    }
}

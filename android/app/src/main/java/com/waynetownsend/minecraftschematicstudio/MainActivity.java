package com.waynetownsend.minecraftschematicstudio;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AndroidFileSaverPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

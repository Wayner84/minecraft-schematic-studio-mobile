import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.waynetownsend.minecraftschematicstudio',
  appName: 'Schematic Studio',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;

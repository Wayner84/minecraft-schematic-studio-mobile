# Minecraft Schematic Studio Mobile

Mobile-first Android/PWA Minecraft schematic editor targeting Java 1.21.8.

## Features

- Start screen with New Design, Open Design, disabled Import Litematica placeholder, and Settings.
- Mobile editor layout: 3D viewer on top, layer-by-layer grid editor on the bottom.
- Drawing tools: pencil, line, rectangle, filled rectangle, circle, filled circle, and eraser.
- 10 editable quick palette slots plus an All Blocks picker that does not overwrite the quick slots.
- Full Java 1.21.8 block picker generated from `minecraft-data`.
- Texture-style previews in the palette/hotbar/grid.
- Java resource pack `.zip` upload support for matching block textures.
- Light/dark mode.
- JSON save/open plus editor-side litematic import/export tooling.

## Development

```bash
npm install
npm run build
```

## Android build

```bash
npm run build
npx cap sync android
cd android
./gradlew assembleDebug
```

The first release ships a debug APK for early testing while the app is still being shaped.

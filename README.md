# Minecraft Schematic Studio

**A mobile-friendly Minecraft Java schematic editor for sketching, editing, importing, and exporting builds on Android and in the browser.**

[Open the Web App](https://wayner84.github.io/minecraft-schematic-studio-mobile/) · [Download the Android APK](https://github.com/Wayner84/minecraft-schematic-studio-mobile/releases/latest) · [Support development with PayPal](https://www.paypal.com/paypalme/Wayner84)

Minecraft Schematic Studio is designed for players who want a simple way to plan Minecraft Java builds without needing a full desktop editor. It runs as a GitHub Pages web app on PC/Mac and is also available as an Android APK for mobile use.

> Independent fan-made tool. Not an official Minecraft, Mojang, or Microsoft product.

## Highlights

- **Use it on web or Android** — open it in a browser on PC/Mac/Linux, or install the APK on Android.
- **Layer-based build editing** — work through your build one Y-level at a time using a fast grid editor.
- **Live 3D preview** — see your schematic take shape while you draw.
- **Minecraft Java block palette** — block list generated for Java 1.21.8 using versioned Minecraft data.
- **Texture previews** — palette, grid, and 3D preview use texture-style rendering.
- **Resource pack support** — load a Java resource pack `.zip` so blocks display using matching pack textures where available.
- **Common drawing tools** — pencil, eraser, line, rectangle, filled rectangle, circle, and filled circle.
- **Quick palette + full block picker** — keep favourite blocks handy while still being able to search the full block list.
- **Storage and redstone blocks included** — includes support for blocks such as chests, double-chest-style placement data, redstone components, rails, repeaters, comparators, buttons, levers, lamps, and other Java block states represented by the block palette.
- **Save and reopen designs** — save native project files for continued editing.
- **Litematica workflow** — import and export `.litematic` files for moving builds between the app and Minecraft tooling.
- **Light and dark themes** — choose the look that suits your screen.

## Start using it

### Web app

Open:

https://wayner84.github.io/minecraft-schematic-studio-mobile/

The web version works directly in modern browsers on PC, Mac, Linux, Android, and iOS. For the best experience, use Chrome, Edge, or another Chromium-based browser.

### Android APK

Download the latest APK from the releases page:

https://github.com/Wayner84/minecraft-schematic-studio-mobile/releases/latest

Install the APK on your Android device. You may need to allow installation from your browser or file manager the first time you sideload it.

## How to use

1. **Start a design**
   - Press **New design** to create a fresh 128 × 128 build canvas.
   - Use **Open design** to reopen a saved native project file.
   - Use **Import Litematica** to bring in a `.litematic` schematic.

2. **Choose blocks**
   - Pick from the quick palette for common blocks.
   - Open the full block picker when you need another Java block.
   - Load a resource pack from Settings if you want the previews to use your own textures.

3. **Draw layer by layer**
   - The lower editor shows the current layer as a 2D grid.
   - Use the drawing tools to place, erase, and shape blocks.
   - Move between layers to build upwards.

4. **Check the 3D preview**
   - The top viewer updates as you edit.
   - Use it to inspect the overall shape and catch mistakes while planning.

5. **Save or export**
   - Save a native project file if you want to continue editing later.
   - Export a `.litematic` file when you want to use the build with Litematica-compatible Minecraft tools.

## Texture packs

Minecraft Schematic Studio does not ship Mojang textures. Instead, it can use:

- Built-in demo/procedural previews for immediate editing.
- A Java resource pack `.zip` uploaded by you from the Settings screen.

For best results, use a resource pack that matches the Minecraft Java version you are building for.

## Litematica notes

The app supports importing and exporting `.litematic` files for practical schematic workflows. Because Minecraft blocks can carry many detailed states and tile-entity data, always check important builds in your normal Minecraft/Litematica setup before relying on them in survival or on a server.

## Support the project

If this app helps you plan builds, saves you time, or you just want to support further development, you can buy me a coffee through PayPal:

https://www.paypal.com/paypalme/Wayner84

Every bit helps keep the project improving.

## Development

For contributors or local builds:

```bash
npm install
npm run build
```

### Android build

```bash
npm run android:build
```

The Android app is built from the same Vite/React codebase using Capacitor.

## Links

- Web app: https://wayner84.github.io/minecraft-schematic-studio-mobile/
- Repository: https://github.com/Wayner84/minecraft-schematic-studio-mobile
- Latest APK release: https://github.com/Wayner84/minecraft-schematic-studio-mobile/releases/latest
- PayPal support: https://www.paypal.com/paypalme/Wayner84

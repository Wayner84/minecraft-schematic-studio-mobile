import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Relative base works inside the Android WebView and when hosted from any GitHub Pages path.
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        navigateFallback: null,
      },
      manifest: {
        name: 'Minecraft Schematic Studio Mobile',
        short_name: 'Schematic',
        description: 'Mobile-first Minecraft Java 1.21.8 schematic editor with 3D orbit + layer grid.',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#0b0f14',
        theme_color: '#0b0f14',
        icons: [
          { src: './icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: './icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})

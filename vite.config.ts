import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// ⚠️ Wenn dein Repository auf GitHub z. B. `songline` heißt, dann muss
//    hier `'/songline/'` stehen. Für ein User-/Org-Pages-Repo (USER.github.io)
//    nimm `'/'`. Mehr Infos: README.md.
const REPO_BASE = "/Songline/";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? REPO_BASE : "/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Songline – Musik Timeline",
        short_name: "Songline",
        description:
          "Private digitale Timeline für Musik-Zeitstrahl-Spiele. Trage Songs ein und sortiere sie nach Jahr.",
        theme_color: "#0b0b14",
        background_color: "#0b0b14",
        display: "standalone",
        orientation: "portrait",
        start_url: mode === "production" ? REPO_BASE : "/",
        scope: mode === "production" ? REPO_BASE : "/",
        lang: "de",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "pwa-maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
        navigateFallback:
          mode === "production" ? `${REPO_BASE}index.html` : "/index.html",
      },
    }),
  ],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));

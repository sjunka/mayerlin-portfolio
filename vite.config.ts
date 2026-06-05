import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "logo-mr.png", "foto-mayerlin.jpg"],
      manifest: {
        name: "MR Desarrollo Humano Organizacional",
        short_name: "MR Desarrollo Humano",
        description: "Mayerlin Rueda · Psicóloga Organizacional — 100% online.",
        theme_color: "#1F4E5B",
        background_color: "#F9F8F6",
        display: "standalone",
        start_url: "/",
        lang: "es",
        icons: [
          { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "pwa-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2}"],
      },
    }),
  ],
  base: "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("framer-motion")) return "motion";
          if (id.includes("react-dom") || id.includes("react/")) return "vendor";
        },
      },
    },
  },
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // यहाँ से favicon.ico हटा दिया गया है, सिर्फ png लोगो रखा है
      includeAssets: ['logo.png'], 
      manifest: {
        name: 'Exam Saarthi | IGU PYQ & Previous Year Question Papers',
        short_name: 'ExamSaarthi',
        description: 'Exam Saarthi offers IGU previous year question papers, PYQ PDFs, and university exam resources for smarter preparation.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: 'logo.png', // आपकी वेबसाइट का ओरिजिनल PNG लोगो
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
});

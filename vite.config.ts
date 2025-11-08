import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { VitePWA } from 'vite-plugin-pwa'

const vitePWA = VitePWA({
  registerType: 'autoUpdate',
  devOptions: {
    enabled: true
  },
  includeAssets: ['favicon.ico', 'mask-icon.svg'],
  manifest: {
    name: 'Budget Buddy',
    short_name: 'Budget Buddy',
    description:
      'Budget Buddy - Приложение для учета личных финансов. Оно позволит вам легко отслеживать доходы и расходы, ставить финансовые цели и оптимизировать бюджет. Простой и интуитивно понятный интерфейс делает управление финансами быстрым и удобным.',
    theme_color: '#000000',
    background_color: '#1D1B20',
    lang: 'ru',
    icons: [
      {
        src: 'assets/images/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'assets/images/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  }
})

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith('md-')
          }
        }
      }
    }),
    vitePWA
  ],
  // base: process.env.NODE_ENV === 'production' ? `/${import.meta.env.VITE_REPO_NAME}/` : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/styles/global.scss";`
      }
    }
  }
})

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  routeRules: {
    '/': { prerender: true },
  },

  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/eruda',
        },
        {
          textContent: 'eruda.init();',
        },
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    },

    keepalive: true,
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@vite-pwa/nuxt', '@nuxtjs/color-mode', '@nuxtjs/i18n'],

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
  },

  i18n: {
    defaultLocale: 'ar',
    strategy: 'no_prefix',
    locales: [
      { code: 'ar', name: 'Arabic', file: 'ar.json', dir: 'rtl' },
      { code: 'en', name: 'English', file: 'en.json' },
    ],
    restructureDir: 'app',
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Vebo',
      short_name: 'Vebo',
      description: 'A Nuxt 4 Progressive Web App',
      theme_color: '#FF0033',
      display: 'standalone',
      icons: [
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      share_target: {
        action: '/share-target',
        method: 'GET',
        enctype: 'application/x-www-form-urlencoded',
        params: {
          title: 'title',
          text: 'text',
          url: 'url',
        },
      },
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    experimental: {
      includeAllowlist: true,
    },
    workbox: {
      globPatterns: ['**/*'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
  },
})

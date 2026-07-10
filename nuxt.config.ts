import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  routeRules: {
    /*
    '/': { prerender: true },
    '/search': { prerender: true },
    '/settings': {
      prerender: true,
      robots: false
    },
    '/about/**': { prerender: true },
    '/movies/**': { swr: 3600 },
    '/shows/**': { swr: 21600 },
    '/keyword/**': { swr: 21600 },
    '/network/**': { swr: 86400 },
    '/season/**': { swr: 86400 },
    '/episode/**': { swr: 86400 },
    '/collection/**': { swr: 86400 },
    '/genre/**': { swr: 21600 },
    '/discover/**': { swr: 1800 },
    '/person/**': { swr: 86400 },
    '/company/**': { swr: 86400 },
    '/profile/**': {
      ssr: false,
      robots: false
    },
    '/favorites': {
      ssr: false,
      robots: false
    },
    '/watchlist': {
      ssr: false,
      robots: false
    },
    '/auth/**': {
      prerender: true,
      robots: false,
    },
    '/api/**': {
      robots: false
    },
    '/api/trending/**': { swr: 1800 },
    '/api/details/**': { swr: 3600 },
    '/api/person/**': { swr: 86400 },
    '/api/discover/**': { swr: 1800 },
    '/api/tmdb/**': { swr: 3600 },
    '/images/tmdb/posters/**': {
      headers: {
        'cache-control': 'public,max-age=31536000'
      },
      proxy: 'https://image.tmdb.org/t/p/**'
    },
    */
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
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap',
        },
      ],
    },

    /*
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
*/

    // keepalive: true,
  },

  css: ['./app/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  modules: ['@vueuse/nuxt', '@pinia/nuxt', '@vite-pwa/nuxt', '@nuxtjs/color-mode', '@nuxtjs/i18n', '@nuxt/ui', 'shadcn-nuxt'],

  colorMode: {
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storageKey: 'preferences.theme',
  },

  i18n: {
    locale: 'ar-TN',
    defaultLocale: 'ar-TN',
    strategy: 'no_prefix',
    locales: [
      { code: 'ar-TN', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' },
    ],
    restructureDir: 'app',
  },

  pinia: {
    storesDirs: ['./app/stores/**'], // './stores/preferences/**'],
  },

  ui: {
    fonts: false,
    colors: {
      primary: 'spring',
      neutral: 'zinc',
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: 'Sh',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/sh',
  },

  pwba: {
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

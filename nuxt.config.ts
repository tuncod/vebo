import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    head: {
      script: [
        {
          src: 'https://unpkg.com/eruda'
        },
        {
          textContent: 'eruda.init();'
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
    plugins: [
      tailwindcss(),
    ],
  },

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],

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
    ]
  },

  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Vebo',
      short_name: 'Vebo',
      description: 'A Nuxt 4 Progressive Web App',
      theme_color: '#FF3300',
      icons: [
        {
          src: '/pwa-icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/pwa-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://vebo-eta.vercel.app/.*',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 86400,
            },
          },
        },
      ],
    },
  },
})

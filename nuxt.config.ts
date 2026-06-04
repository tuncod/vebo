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
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap',
        },
      ],
    }
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
  ],
})

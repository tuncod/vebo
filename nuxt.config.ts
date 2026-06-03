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
        }
      ]
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



// nuxt.config.ts
export default defineNuxtConfig({
  
})
export default defineNuxtPlugin(() => {
  return {
    provide: {
      tmdb: () => {
        const store = useTimezoneStore()
        const { locale } = useI18n()

        return new TMDB('demo-key', {
          language: locale.value ?? 'en-US',
          timezone: store.timezone ?? 'Europe/Madrid',
        })
      }
    }
  }
})
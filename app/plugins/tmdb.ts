import { TMDB as BaseTMDB } from '@lorenzopant/tmdb'
import type { TMDBOptions } from '@lorenzopant/tmdb/types'

const TMDB_API_BASE = 'https://vebo-eta.vercel.app/api/external' // https://api.themoviedb.org/3

class TMDB extends BaseTMDB {
  constructor(accessToken: string, options: TMDBOptions = {}) {
    super(accessToken, options)
    this.client.baseUrl = TMDB_API_BASE
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      tmdb: () => {
        // const store = useTimezoneStore()
        const { localeProperties } = useI18n()

        return new TMDB('demo-key', {
          // language: locale.value ?? 'en-US',
          // timezone: store.timezone ?? 'Europe/Madrid',
          language: localeProperties?.value.code || 'en-US', // 'en-US', // 'ar-SA',
        })
      }
    }
  }
})
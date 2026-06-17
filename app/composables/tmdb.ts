import { ofetch } from 'ofetch'
import { TMDB as BaseTMDB } from '@lorenzopant/tmdb'

const TMDB_API_BASE = 'https://vebo-eta.vercel.app/api/external' // https://api.themoviedb.org/3
const TMDB_API_KEY = '8301a21598f8b45668d5711a814f01f6'

const tmdbFetch = ofetch.create()

export const useTMDBFetch = async (url: string, options) => {
  return await useFetch(url, {
    ...options,
    baseURL: TMDB_API_BASE,
  })
}

class TMDB extends BaseTMDB {
  constructor(accessToken: string, options = {}) {
    super(accessToken, options)
    this.client.baseUrl = TMDB_API_BASE
  }
}

const timezoneStore = useTimezoneStore()

const tmdb = new TMDB('demo-key', {
  language: 'en-US', // 'ar-SA',
  timezone: timezoneStore.timezone,
  images: {
    secure_images_url: true,
    autocomplete_paths: true,
  },
  logger: (entry) => {
    // console.log(`[${entry.type}] ${entry.method} ${entry.endpoint}`);
    // console.log(entry)
    console.log(timezoneStore.timezone)
  },
})

export const useTMDB = () => {
  return tmdb
}

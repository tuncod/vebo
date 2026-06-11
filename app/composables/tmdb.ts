import { ofetch } from 'ofetch'

const TMDB_API_BASE = 'https://vebo-eta.vercel.app/api/external' // https://api.themoviedb.org/3
const TMDB_API_KEY = '8301a21598f8b45668d5711a814f01f6'

const tmdbFetch = ofetch.create()

export const useTmdb = async (url: string, options) => {
  return await useFetch(url, {
    ...options,
    baseURL: TMDB_API_BASE,
  })
}

import { ofetch } from 'ofetch'

const TMDB_API_BASE = 'https://api.themoviedb.org/3'
const TMDB_API_KEY = '8301a21598f8b45668d5711a814f01f6'

const tmdbFetch = ofetch.create({
  baseURL: TMDB_API_BASE,
})

export default defineEventHandler(async (event) => {
  const path = event.context.params._

  return await tmdbFetch(path, {
    query: {
      api_key: TMDB_API_KEY,
    },
  })
})

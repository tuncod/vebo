import { ofetch } from 'ofetch'
import { setResponseHeader } from 'h3'

const TMDB_API_BASE = 'https://api.themoviedb.org/3'

const tmdb_keys = [
  /* your keys */
]

const tmdbFetch = ofetch.create({
  baseURL: TMDB_API_BASE,
})

const pickKey = (used = new Set()) => {
  const available = tmdb_keys.filter((k) => !used.has(k))
  return available[Math.floor(Math.random() * available.length)]
}

export default defineEventHandler(async (event) => {
  const path = event.context.params._

  const usedKeys = new Set()
  let lastError

  for (let i = 0; i < tmdb_keys.length; i++) {
    const apiKey = pickKey(usedKeys)
    usedKeys.add(apiKey)

    try {
      const result = await tmdbFetch(path, {
        query: { api_key: apiKey },
      })

      // 👇 set header BEFORE returning
      setResponseHeader(event, 'x-tmdb-keys-used', String(usedKeys.size))
      setResponseHeader(event, 'x-tmdb-key-attempts', String(i + 1))

      return result
    } catch (err) {
      lastError = err

      const status = err?.response?.status

      if (![401, 403, 429].includes(status)) {
        throw err
      }
    }
  }

  setResponseHeader(event, 'x-tmdb-keys-used', String(usedKeys.size))
  throw lastError
})

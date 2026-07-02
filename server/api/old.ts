import { ofetch } from 'ofetch'
import { setResponseHeader } from 'h3'

const TMDB_API_BASE = 'https://api.themoviedb.org/3'

const tmdb_keys = [
  'fb7bb23f03b6994dafc674c074d01761',
  'e55425032d3d0f371fc776f302e7c09b',
  '8301a21598f8b45668d5711a814f01f6',
  '8cf43ad9c085135b9479ad5cf6bbcbda',
  'da63548086e399ffc910fbc08526df05',
  '13e53ff644a8bd4ba37b3e1044ad24f3',
  '269890f657dddf4635473cf4cf456576',
  'a2f888b27315e62e471b2d587048f32e',
  '8476a7ab80ad76f0936744df0430e67c',
  '5622cafbfe8f8cfe358a29c53e19bba0',
  'ae4bd1b6fce2a5648671bfc171d15ba4',
  '257654f35e3dff105574f97fb4b97035',
  '2f4038e83265214a0dcd6ec2eb3276f5',
  '9e43f45f94705cc8e1d5a0400d19a7b7',
  'af6887753365e14160254ac7f4345dd2',
  '06f10fc8741a672af455421c239a1ffc',
  'fb7bb23f03b6994dafc674c074d01761',
  '09ad8ace66eec34302943272db0e8d2c',
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
  const query = getQuery(event)

  const usedKeys = new Set()
  let lastError

  for (let i = 0; i < tmdb_keys.length; i++) {
    const apiKey = pickKey(usedKeys)
    usedKeys.add(apiKey)

    try {
      const result = await tmdbFetch(path, {
        query: {
          ...query,
          api_key: apiKey,
        },
      })

      // 👇 set header BEFORE returning
      setResponseHeader(event, 'x-tmdb-keys-used', String(usedKeys.size))
      setResponseHeader(event, 'x-tmdb-key-attempts', String(i + 1))
      // setResponseHeader(event, 'x-tmdb-req-path', String(path))

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

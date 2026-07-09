import { ofetch } from 'ofetch'
import { setResponseHeader } from 'h3'
import { tmdb } from '~~/server/utils/tmdb'

export default defineEventHandler(async (event) => {
  const path = event.context.params._
  const query = getQuery(event)

  const data = tmdb(path, {
    query,
  })

  // setResponseHeader(event, 'x-tmdb-keys-used', String(usedKeys.size))
  // setResponseHeader(event, 'x-tmdb-key-attempts', String(i + 1))

  return data
})

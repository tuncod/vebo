import { ofetch } from 'ofetch'
import { setResponseHeader } from 'h3'
import { tmdb, usedKeys } from '~~/server/utils/tmdb'

const selections = new Map([
  [
    'discover/movies/trends/week',
    {
      endpoint: 'trending/movie/week',
      query: {
        jfjf: 72,
      },
    },
  ],
])

export default defineEventHandler(async (event) => {
  const selectionId = event.context.params.selection
  const query = getQuery(event)

  const selection = selections.get(selectionId)

  const data = tmdb(selection.endpoint, {
    query,
  })

/*
  setResponseHeader(event, 'x-tmdb-keys-used', String(usedKeys.size))
  setResponseHeader(event, 'x-tmdb-key-attempts', String(i + 1))
*/


  return {
    selectionId,
    selection,
    usedKeys,
  }
})

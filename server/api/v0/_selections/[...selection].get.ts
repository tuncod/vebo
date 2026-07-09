import { ofetch } from 'ofetch'
import { setResponseHeader } from 'h3'
import { tmdb } from '~~/server/utils/tmdb'
import { ref } from 'vue'

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

  const votes = ref(0)

  const selection = selections.get(selectionId)

  const data = await tmdb(selection.endpoint, {
    query,
  })

/*
  setResponseHeader(event, 'x-tmdb-keys-used', String(usedKeys.size))
  setResponseHeader(event, 'x-tmdb-key-attempts', String(i + 1))
*/


  return {
    selectionId,
    selection,
    votes,
    data,
  }
})

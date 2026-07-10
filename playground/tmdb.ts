import { TMDB as BaseTMDB, ApiClient as BaseApiClient } from '@lorenzopant/tmdb'

class TMDB extends BaseTMDB {
  constructor(accessToken: string, options = {}) {
    super(accessToken, options)
    this.client.baseUrl = 'https://vebo-eta.vercel.app/api/external'
  }
}

const tmdb = new TMDB('demo-key', {
  images: {
    secure_images_url: true,
    autocomplete_paths: true,
  },
  logger: (entry) => {
    // console.log(`[${entry.type}] ${entry.method} ${entry.endpoint}`);
    // console.log(entry)
  },
})

// const res = await tmdb.movies.details({ movie_id: 1084244 })
const res = await tmdb.trending.movies({ time_window: 'week' })
console.log(res)

import { TMDB as BaseTMDB } from '@lorenzopant/tmdb'
import type { TMDBOptions } from '@lorenzopant/tmdb/types'
import freekeys from 'freekeys'

export class TMDB extends BaseTMDB {
  constructor(accessToken: string, options: TMDBOptions = {}) {
    super('apikey', options)
    this.setKeys()
  }

  async setKeys() {
    const { tmdb_key } = await freekeys()
    this.client.accessToken = tmdb_key
  }
}

export const createClient = (options: TMDBOptions = {}): TMDB => {
  return new TMDB(options)
}

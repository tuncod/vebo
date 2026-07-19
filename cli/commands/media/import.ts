import { defineCommand } from 'citty'
import { consola } from 'consola'
import { ofetch } from '#cli/utils/fetch'
import { WikiBase } from '#shared/utils/wikibase'
import { createClient } from '#server/utils/tmdb'
import ora from 'ora'
import { WIKIDATA_INSTANCE, WIKIDATA_SPARQL_ENDPOINT, WIKIDATA_SPARQL_USERAGENT } from '#shared/constants'

const tmdb = createClient()

const wikibase = new WikiBase({
  instance: WIKIDATA_INSTANCE,
  sparqlEndpoint: WIKIDATA_SPARQL_ENDPOINT,
  userAgent: WIKIDATA_SPARQL_USERAGENT,
})

const validID = (id) => /^(tt)?\d+$/.test(id)

export default defineCommand({
  meta: { name: 'Import' },
  args: {
    id: {
      type: 'positional',
      description: 'Media ID',
      required: true,
    },
    type: {
      type: 'enum',
      options: ['movie', 'tv'],
      required: true,
      alias: 't',
    },
    source: {
      type: 'enum',
      options: ['imdb', 'tmdb'],
      default: 'imdb',
      alias: 's',
    },
  },
  async run({ args }) {
    const client = args.type === 'movie' ? tmdb.movies : tmdb.tv

    if (!validID(args.id)) {
      return consola.error('Must provide valid id.')
    }

    consola.info(`Importing ${args.type} "${args.id}".`)

    // await ofetch('https://google.com')
    const importCredists = await consola.prompt('Import the credits?', {
      type: 'confirm',
    })

    consola.box(importCast)
  },
})

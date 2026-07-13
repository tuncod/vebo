import { defineCommand } from 'citty'
import { consola } from 'consola'
import { ofetch } from '#cli/utils/fetch'
import { tmdb_keys } from '#server/utils/tmdb'

const validID = (id) => /^(tt)?\d+$/.test(id)

export default defineCommand({
  meta: { name: 'Import' },
  args: {
    id: { type: 'positional', description: 'Media ID', required: true },
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

    if (!validID(args.id)) {
      return consola.error('Must provide valid id.')
    }

    consola.info(`Importing ${args.type} "${args.id}".`)
    // await ofetch('https://google.com')
    const importCast = await consola.prompt('Import the cast?', {
      type: 'confirm',
    })
    consola.box(importCast)
  },
})

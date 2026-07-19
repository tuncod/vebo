import { defineCommand, runMain } from 'citty'
import { config as dotenvConfig } from 'dotenv'
import { resolve, join } from 'pathe'
import { basename, dirname, extname, relative } from 'pathe'
import * as p from 'pathe'
import ora from 'ora'
import { filename, normalizeAliases, resolveAlias, reverseResolveAlias } from 'pathe/utils'
import * as fss from 'node:fs/promises'
import * as fs from 'node:fs'
import { tmdb_keys } from '#server/utils/tmdb'

dotenvConfig({ quiet: true })

console.log(
  tmdb
)

/*
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const spinner = ora('Loading unicorns').start()

await delay(2500)

spinner.text = 'Loading movie'

await delay(3000)

spinner.text = 'Loading actors'
await delay(2800)

spinner.text = 'Loading products'
await delay(3000)

spinner.text = 'Loading reviews'
await delay(3000)

spinner.succeed('Done!')
*/

// consola.box(process.env)

const media = defineCommand({
  meta: { name: 'Media', description: 'Media command' },
  subCommands: {
    // import: () => import('./commands/media/import').then((m) => m.default),
  },
})

const main = defineCommand({
  meta: { name: 'Vebo', version: '1.0.0', description: 'My Awesome CLI App' },
  subCommands: {
    media,
  },
})

// runMain(main)

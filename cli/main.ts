import { defineCommand, runMain } from 'citty'
import media from '#cli/commands/media'

const main = defineCommand({
  meta: {
    name: 'Vebo',
    version: '1.0.0',
    description: 'CLi to manage data',
  },
  subCommands: {
    media,
  },
})

runMain(main)

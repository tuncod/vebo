import { defineCommand } from 'citty'
import importCommand from './media/import'

export default defineCommand({
  meta: {
    name: 'Media',
    description: 'Media command',
  },
  subCommands: {
    // import: () => import('./import').then((m) => m.default),
    import: importCommand,
  },
})

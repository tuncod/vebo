import { readFile, writeFile } from 'node:fs/promises'

const readTSConfig = async () => {
  const buffer = await readFile('./.nuxt/tsconfig.shared.json')
  const config = JSON.parse(buffer.toString())
  return config
}

const config = await readTSConfig()

config.compilerOptions.paths['#cli'] = [
  '../cli',
]
config.compilerOptions.paths['#cli/*'] = [
  '../cli/*',
]

config.include = [
  ...config.include,
  '../cli/**/*.ts'
]

await writeFile('./.nuxt/tsconfig.cli.json', JSON.stringify(config, null, 2))

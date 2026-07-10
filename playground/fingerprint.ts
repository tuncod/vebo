import * as ohash from 'ohash'
import { diff } from 'ohash/utils'
import { consola } from 'consola'
import * as hh from '../shared/constants'

console.info(
  hh
)

const obj1 = {
  useragent: '',
  ip: '27.83.83.349',
  nested: {
    demo: true,
  }, 
  nested2: {
    demo: true,
    hdbfhfh: true,
  },
}

const obj2 = {
  useragent: '',
  clipboard: true,
  useragent: 'My App',
  nested: {
    demo: true,
    hello: 'hi',
  },
}

const obj1_hashed = ohash.hash(obj1)
const obj2_hashed = ohash.hash(obj2)

diff(obj1, obj2).forEach((item) => {
  if (item.type === 'removed') {
    consola.error(`Item "${item.key}" Removed.`)
  }
  if (item.type === 'changed') {
    consola.warn(`Item "${item.key}" Changef.`)
  }
  if (item.type === 'added') {
    consola.success(`Item "${item.key}" Added.`)
  }

})
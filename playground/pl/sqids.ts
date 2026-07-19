import Sqids from 'sqids'
import { consola } from 'consola'
import { ulid } from 'ulid'
import { subtle, randomUUID, getRandomValues } from 'uncrypto'

const sqids = new Sqids({
  minLength: 11,
  alphabet: 'FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE',
})

const IMDB_PREFIX_ID = 263
const TMDB_MOVIES_PREFIX_ID = 739
const TMDB_TV_PREFIX_ID = 728

const encode = (type, id) => {
  id = Array.isArray(id) ? id : [id]
  return sqids.encode([type, ...id])
}

const decode = (id) => {
  const [type, ...ids] = sqids.decode(id)
  return {
    type,
    id: ids.length > 1 ? ids : ids[0]
  }
}

const id = encode(TMDB_MOVIES_PREFIX_ID, 6392)
// const id = encode(TMDB_MOVIES_PREFIX_ID, [6392, 7373])

consola.info(
  'encode',
  id
)

consola.info(
  'decode',
  decode(id)
)

consola.info(
  'ulid',
  ulid()
)

consola.info(
  'uuid',
  randomUUID()
)

consola.info(
  // getRandomValues([1, 2, 3, 4])
)
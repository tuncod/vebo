import Sqids from 'sqids'

const sqids = new Sqids({
  minLength: 11,
  alphabet: 'FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE',
})
const id = sqids.encode([73646273]) // "86Rf07xd4z"
const numbers = sqids.decode(id) // [1, 2, 3]

console.log(id)

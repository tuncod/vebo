import Sqids from 'sqids'
import { consola } from 'consola'
import { ulid } from 'ulid'
import { subtle, randomUUID, getRandomValues } from 'uncrypto'


function shuffle(chars) {
    const arr = [...chars];
    const rand = new Uint32Array(1);

    for (let i = arr.length - 1; i > 0; i--) {
        crypto.getRandomValues(rand);
        const j = rand[0] % (i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr.join('');
}

const charset =
    'abcdefghijklmnopqrstuvwxyz' +
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
    '0123456789' +
    '!@#$%^&*_-';

console.log(shuffle(charset));


function randomString1(regex, shuffle = true) {
    const chars = [];

    if (regex.includes("a-z"))
        chars.push(...'abcdefghijklmnopqrstuvwxyz');

    if (regex.includes("A-Z"))
        chars.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ');

    if (regex.includes("0-9"))
        chars.push(...'0123456789');

    if (shuffle) {
        for (let i = chars.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [chars[i], chars[j]] = [chars[j], chars[i]];
        }
    }

    return chars.join('');
}

function randomString(regex, length = 20) {
    let chars = '';

    if (regex.includes("a-z")) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (regex.includes("A-Z")) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (regex.includes("0-9")) chars += '0123456789';

    return Array.from({ length }, () =>
        chars[Math.floor(Math.random() * chars.length)]
    ).join('');
}

console.log(randomString("[a-zA-Z0-9]", 647));
console.log(randomString("[a-zA-Z0-9!@#$%^&*]", 24))

console.log(randomString1("[a-zA-Z0-9]"));
// e.g. "FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE"

const sqids = new Sqids({
  minLength: 6,
  alphabet: 'FxnXM1kBN6cuhsAvjW3Co7l2RePyY8DwaU04Tzt9fHQrqSVKdpimLGIJOgb5ZE',
})

const IMDB_PREFIX_ID = 263
const TMDB_MOVIES_PREFIX_ID = 739
const TMDB_TV_PREFIX_ID = 728

const encode = (ids) => {
  let { type, imdb, tmdb } = ids
  type = type === 'movie' ? 1 : 0
  imdb = Number(imdb.replace('tt', ''))
  return sqids.encode([type, imdb, tmdb])
}

const decode = (id) => {
  const [type, imdb, tmdb] = sqids.decode(id)
  return {
    type: type ? 'movie' : 'tv',
    imdb: `tt${imdb}`,
    tmdb,
  }
}

const id = encode({
  type: 'movie',
  imdb: 'tt82747392',
  tmdb: 6392
})
// const id = encode(TMDB_MOVIES_PREFIX_ID, [6392, 7373])

consola.info(
  'encode',
  id
)

consola.info(
  'decode',
  decode(id)
)
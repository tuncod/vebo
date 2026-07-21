const ids = [
  { id: '84374', type: 'movie' },
  { id: '84788', type: 'movie' },
  { id: '84242', type: 'movie' },
  { id: '84208', type: 'movie' },

  { id: '943749', type: 'tv' },
  { id: '943044', type: 'tv' },
  { id: '946384', type: 'tv' },
  { id: '940473', type: 'tv' },
]

const getIds = (ids, type) => ids.filter((i) => i.type === type).map((i) => Number(i.id))
console.log(
  'movie',
  getIds(ids, 'movie')
)

console.log(
  'tv',
  getIds(ids, 'tv')
)
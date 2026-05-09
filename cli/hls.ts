import { ofetch } from 'ofetch'

const imdbId = 'tt22507484'

const { data } = await ofetch('https://streamdata.vaplayer.ru/api.php', {
  query: {
    imdb: imdbId,
    type: 'movie'
  },
  headers: {
    Referer: `https://brightpathsignals.com/embed/movie/${imdbId}`,
  },
})

const streams = data.stream_urls

const h = await ofetch(streams[3], {
  headers: {
    Referer: `https://brightpathsignals.com/embed/movie/${imdbId}`,
  },
})

console.log(
  await h.text()
)


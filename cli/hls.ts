import { ofetch } from 'ofetch'

const imdbId = 'tt22507484'

const { data } = await ofetch('https://streamdata.vaplayer.ru/api.php', {
  query: {
    imdb: imdbId,
    type: 'movie',
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

console.log(await h.text())

/*
import fetch from "node-fetch";
import { Parser } from "m3u8-parser";

async function getHlsInfo(url) {
  const res = await fetch(url);
  const text = await res.text();

  const parser = new Parser();
  parser.push(text);
  parser.end();

  const manifest = parser.manifest;

  let duration = 0;

  if (manifest.segments) {
    duration = manifest.segments.reduce(
      (sum, seg) => sum + seg.duration,
      0
    );
  }

  console.log({
    duration,
    segments: manifest.segments?.length,
    playlists: manifest.playlists?.length
  });
}

getHlsInfo("https://example.com/master.m3u8");

// other
async function getTotalSize(segments, baseUrl) {
  let total = 0;

  for (const seg of segments) {
    const url = new URL(seg.uri, baseUrl).href;

    const res = await fetch(url, {
      method: "HEAD"
    });

    const len = res.headers.get("content-length");

    total += Number(len || 0);
  }

  return total;
}

const size = await getTotalSize(
  manifest.segments,
  m3u8Url
);

console.log(
  (size / 1024 / 1024).toFixed(2),
  "MB"
);

//

import ffmpeg from "fluent-ffmpeg";

// ffprobe -i "url.m3u8" \
-show_format \
-show_streams \
-v quiet \
-print_format json

*/

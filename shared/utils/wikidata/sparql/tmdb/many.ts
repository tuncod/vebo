const getIds = (ids, type) => ids.filter((i) => i.type === type).map((i) => Number(i.id))

const values = (items) => items.map((id) => `      "${id}"`).join('\n')

type Id = {
  id: string | number
  type: 'movie' | 'tv'
}

export const findManyByTMDB = (ids: Id[]) => {
  const movies = getIds(ids, 'movie')
  const series = getIds(ids, 'tv')

  return `
SELECT
  ?type 
  ?movie
  ?movieLabel
  ?tmdb
  ?imdb
  ?elcinema
  ?netflix
  ?rt
  ?metacritic
  ?trakt
  ?mdl
  ?mal
  ?anilist
  ?kitsu
  ?anidb
  ?tvmaze
  ?tvdb
  ?fanart
  ?enwiki
  ?arwiki
WHERE {
  {
    VALUES ?tmdb {
${values(movies)}
    }

    ?movie wdt:P4947 ?tmdb.

    OPTIONAL { ?movie wdt:P4947 ?tmdb. }
    OPTIONAL { ?movie wdt:P345  ?imdb. }
    OPTIONAL { ?movie wdt:P3135 ?elcinema. }
    OPTIONAL { ?movie wdt:P1874 ?netflix. }
    OPTIONAL { ?movie wdt:P1258 ?rt. }
    OPTIONAL { ?movie wdt:P1712 ?metacritic. }
    OPTIONAL { ?movie wdt:P6612 ?trakt. }
    OPTIONAL { ?movie wdt:P4086 ?mdl. }
    OPTIONAL { ?movie wdt:P4087 ?mal. }
    OPTIONAL { ?movie wdt:P8729 ?anilist. }
    OPTIONAL { ?movie wdt:P7434 ?kitsu. }
    OPTIONAL { ?movie wdt:P5646 ?anidb. }
    OPTIONAL { ?movie wdt:P5032 ?tvmaze . }
    OPTIONAL { ?movie wdt:P2603 ?tvdb. }
    OPTIONAL { ?movie wdt:P4803 ?fanart. }


    # Wikipedia sitelinks
    OPTIONAL {
      ?enwiki schema:about ?movie ;
              schema:isPartOf <https://en.wikipedia.org/> .
    }

    OPTIONAL {
      ?arwiki schema:about ?movie ;
              schema:isPartOf <https://ar.wikipedia.org/> .
    }

    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en".
    }

    BIND("movie" AS ?type)
  } UNION {
    VALUES ?tmdb {
${values(series)}
    }

    ?movie wdt:P4983 ?tmdb.

    OPTIONAL { ?movie wdt:P4947 ?tmdb. }
    OPTIONAL { ?movie wdt:P345  ?imdb. }
    OPTIONAL { ?movie wdt:P3135 ?elcinema. }
    OPTIONAL { ?movie wdt:P1874 ?netflix. }
    OPTIONAL { ?movie wdt:P1258 ?rt. }
    OPTIONAL { ?movie wdt:P1712 ?metacritic. }
    OPTIONAL { ?movie wdt:P6612 ?trakt. }
    OPTIONAL { ?movie wdt:P4086 ?mdl. }
    OPTIONAL { ?movie wdt:P4087 ?mal. }
    OPTIONAL { ?movie wdt:P8729 ?anilist. }
    OPTIONAL { ?movie wdt:P7434 ?kitsu. }
    OPTIONAL { ?movie wdt:P5646 ?anidb. }
    OPTIONAL { ?movie wdt:P5032 ?tvmaze . }
    OPTIONAL { ?movie wdt:P2603 ?tvdb. }
    OPTIONAL { ?movie wdt:P4803 ?fanart. }


    # Wikipedia sitelinks
    OPTIONAL {
      ?enwiki schema:about ?movie ;
              schema:isPartOf <https://en.wikipedia.org/> .
    }

    OPTIONAL {
      ?arwiki schema:about ?movie ;
              schema:isPartOf <https://ar.wikipedia.org/> .
    }

    SERVICE wikibase:label {
      bd:serviceParam wikibase:language "en".
    }

    BIND("tv" AS ?type)
  }
}
`
}

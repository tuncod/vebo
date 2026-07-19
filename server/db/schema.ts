import { pgTable, serial, bigserial, integer, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

const ids = {
  id: bigserial({ mode: 'number' }).primaryKey(),
  uuid: uuid().defaultRandom().unique(),
  cuid: text()
    .$defaultFn(() => createId())
    .unique(),
}

const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  deletedAt: timestamp('deleted_at'),
}

const dbIds = {
  imdb_id: text('imdb_id').notNull(),
  tmdb_id: bigserial({ mode: 'number' }).notNull(),
}

export const media = pgTable('media', {
  ...ids,

  slug: text().unique(),
  type: text().$type<'movie' | 'tv'>(),
  runtime: integer(),
  imdb_id: text('imdb_id').notNull(),
  tmdb_id: bigserial({ mode: 'number' }).notNull(),

  overview: text(),
  overviewArabic: text(),
  title: text(),
  titleArabic: text(),

  ...timestamps,
})

export const animes = pgTable('animes', {
  ...ids,

  ...timestamps,
})

export const kdramas = pgTable('kdramas', {
  ...ids,

  ...timestamps,
})

export const people = pgTable('people', {
  ...ids,

  name: text(),
  gender: text().$type<'male' | 'female'>(),
  pronounce: text(),
  imdb_id: text('imdb_id').notNull(),
  tmdb_id: bigserial({ mode: 'number' }).notNull(),

  ...timestamps,
})

export const comments = pgTable('comments', {
  ...ids,

  loved_type: text().$type<'media' | 'people'>(),
  loved_id: bigserial({ mode: 'number' }).notNull(),
  content: text(),

  ...timestamps,
})

export const watchlists = pgTable('watchlists', {
  ...ids,

  user_id: bigserial({ mode: 'number' }).notNull(),
  privacy: text().$type<'public' | 'unlisted' | 'private'>(),
  description: text(),

  ...timestamps,
})

export const watchlistsMedia = pgTable('watchlists__media', {
  watchlist_id: bigserial({ mode: 'number' }).notNull(),
  media_id: bigserial({ mode: 'number' }).notNull(),

  ...timestamps,
})

export const loves = pgTable('loves', {
  ...ids,

  user_id: bigserial({ mode: 'number' }).notNull(),
  loved_type: text().$type<'media' | 'people' | 'comments' | 'watchlists'>(),
  loved_id: bigserial({ mode: 'number' }).notNull(),

  ...timestamps,
})

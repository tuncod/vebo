CREATE TABLE "animes" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"loved_type" text,
	"loved_id" bigserial NOT NULL,
	"content" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid")
);
--> statement-breakpoint
CREATE TABLE "kdramas" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid")
);
--> statement-breakpoint
CREATE TABLE "loves" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"user_id" bigserial NOT NULL,
	"loved_type" text,
	"loved_id" bigserial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"slug" text,
	"type" text,
	"runtime" integer,
	"imdb_id" text NOT NULL,
	"tmdb_id" bigserial NOT NULL,
	"overview" text,
	"overviewArabic" text,
	"title" text,
	"titleArabic" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid"),
	CONSTRAINT "media_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "people" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"name" text,
	"gender" text,
	"pronounce" text,
	"imdb_id" text NOT NULL,
	"tmdb_id" bigserial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid")
);
--> statement-breakpoint
CREATE TABLE "watchlists" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid(),
	"cuid" text,
	"user_id" bigserial NOT NULL,
	"privacy" text,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "media_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "media_cuid_unique" UNIQUE("cuid")
);
--> statement-breakpoint
CREATE TABLE "watchlists__media" (
	"watchlist_id" bigserial NOT NULL,
	"media_id" bigserial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"deleted_at" timestamp
);

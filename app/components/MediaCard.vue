<script setup lang="ts">
const tmdb = useTMDB()

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

const { data, status } = await useAsyncData('movies_details_' + props.id, () =>
  tmdb.movies.details({
    movie_id: props.id,
    append_to_response: ['credits', 'videos', 'images', 'external_ids'],
  }), {
    lazy: true,
    server: false,
  }
)

const pending = computed(() => status.value === 'pending')

const path = computed(() => {
  if (!data.value?.imdb_id) return ''
  return `/details/${data.value.imdb_id}`
})
</script>

<template>
  <UiMediaCard
    :link="path"
    :loading="pending"
    :poster="data?.poster_path"
    :title="data?.title || data?.original_title"
    :score="data?.vote_average"
    :year="data?.release_date"
  />
</template>

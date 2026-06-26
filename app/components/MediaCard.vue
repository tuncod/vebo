<script setup>
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

const { data } = await useAsyncData('movies_details_' + props.id', () => tmdb.movies.details({
  movie_id: props.id,
  append_to_response: ['credits', 'videos', 'images', 'external_ids'],
}))

</script>

<template>
  <NuxtLink :to="`/details/${props.id}`">
    <div class="hidden">{{ data }}</div>
    <UiMediaCard :poster="data.poster_path" :title="data.title || data.original_title" :score="data.vote_average" :year="data.release_date" />
  </NuxtLink>
</template>
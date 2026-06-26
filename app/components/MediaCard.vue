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

const { data } = await useAsyncdata.value('movies_details_' + props.id', () => tmdb.movies.details({
  movie_id: props.id,
  append_to_response: ['credits', 'videos', 'images', 'external_ids'],
}))

</script>

<template>
  <NuxtLink :to="`/details/${props.id}`">
    <div class="hidden">{{ data }}</div>
    <UiMediaCard :poster="data.value.poster_path" :title="data.value.title || data.value.original_title" :score="data.value.vote_average" :year="data.value.release_date" />
  </NuxtLink>
</template>
<script setup lang="ts">
const { data: movies, error, pending, refresh, clear } = await useAsyncData('trending_movies_week', () => useTMDB().trending.movies({ time_window: 'week' }))

const fullscreen = () => {
  document.documentElement.requestFullscreen()
}

onMounted(() => {
  const layout = window.localStorage.getItem('app_layout')
  if (layout) {
    setPageLayout(layout)
  }
})
</script>
<template>
  <div class="font-montserrat px-3">
    <h1 class="text-5xl font-black my-8" @click="fullscreen">Home</h1>
  </div>
  <div class="px-3">
    <UiMediaScroll :items="movies.results" title="Popular">
      <template #item="{ poster_path, original_title, vote_average, release_date }">
        <UiMediaCard :poster="poster_path" :title="original_title" :score="vote_average" :year="release_date" />
      </template>
    </UiMediaScroll>
  </div>
</template>

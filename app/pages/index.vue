<script setup lang="ts">
const { data: movies } = await useAsyncData('trending_movies_week', () => useTMDB().trending.movies({ time_window: 'week' }))
const { data: shows } = await useAsyncData('trending_shows_week', () => useTMDB().trending.tv({ time_window: 'week' }))

const fullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

onMounted(() => {
  const layout = window.localStorage.getItem('app_layout')
  if (layout) {
    setPageLayout(layout)
  }
})
</script>
<template>
  <div class="font-heading px-3">
    <h1 class="text-5xl font-black my-8" @click="fullscreen">{{ $t('pages.home') }}</h1>
  </div>
  <div class="px-3">
    <UiMediaScroll :items="movies.results" title="This Week's Trending Movies">
      <template #item="{ poster_path, original_title, vote_average, release_date }">
        <UiMediaCard :poster="poster_path" :title="original_title" :score="vote_average" :year="release_date" />
      </template>
    </UiMediaScroll>
  </div>
  <div class="px-3">
    <UiMediaScroll :items="shows.results" title="This Week's Trending TV Shows">
      <template #item="{ poster_path, original_name, vote_average, first_air_date }">
        <UiMediaCard :poster="poster_path" :title="original_name" :score="vote_average" :year="first_air_date" />
      </template>
    </UiMediaScroll>
  </div>
</template>

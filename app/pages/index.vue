<script setup lang="ts">
const { data: movies, error, pending, refresh, clear } = await useAsyncData('trending_movies_week', () => useTMDB().trending.movies({ time_window: 'week' }))

onMounted(() => {
  const layout = window.localStorage.getItem('app_layout')
  if (layout) {
    setPageLayout(layout)
  }
})
</script>
<template>
  <div class="py-5 px-3">
    <UiMediaScroll :items="movies.results" title="Popular">
      <template #default="{ poster_path, original_title, vote_average, release_date }">
        <UiMediaCard :poster="poster_path" :title="original_title" :score="vote_average" :year="release_date" />
      </template>
    </UiMediaScroll>
  </div>
</template>

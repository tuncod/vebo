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
      <UiMediaCard v-for="item in movies.results" :poster="item.poster_path" :title="item.original_title" :score="item.vote_average" :year="item.release_date" />
    </UiMediaScroll>
  </div>
</template>

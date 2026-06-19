<script setup lang="ts">
const { data: movies, error, pending, refresh, clear } = await useAsyncData('mountains', () => useTMDB().trending.movies({ time_window: 'week' }))

onMounted(() => {
  const layout = window.localStorage.getItem('app_layout')
  if (layout) {
    setPageLayout(layout)
  }
})
</script>
<template>
  <div class="py-5 px-3">
    <UiMediaScroll :items="movies.results" title="Popular — شائع" />
  </div>
</template>

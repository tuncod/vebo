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
  <div>
    <h1 class="text-4xl text-red-600 mt-26" @click="refresh">{{ $t('index') }}</h1>

    <MediaScroll :items="movies.results" title="Popular — شائع" />
  </div>
</template>

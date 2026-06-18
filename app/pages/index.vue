<script setup lang="ts">
const movies = await useTMDB().trending.movies({ time_window: 'week' })

const layout = ref('default')

onMounted(() => {
  setInterval(() => {
    layout.value = layout.value === 'default' ? 'appdemo' : 'default'
    setPageLayout(layout.value)
  }, 5000)
})
</script>
<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">{{ $t('index') }}</h1>

    <MediaScroll :items="movies.results" title="Popular — شائع" />
  </div>
</template>

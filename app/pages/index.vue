<script setup lang="ts">
const movies = await useTMDB().trending.movies({ time_window: 'week' })
</script>
<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">{{ $t('index') }}</h1>

    <MediaScroll :items="[]" title="Popular — شائع" />
  </div>
</template>

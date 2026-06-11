<script setup lang="ts">

const { data: movies } = await useTmdb('trending/movie/week')

</script>

<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">Index</h1>

    <MediaScroll :items="movies.results" title="Popular — شائع" />
  </div>
</template>

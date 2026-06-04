<script setup lang="ts">

const movies = await ofetch('https://api.themoviedb.org/3/trending/movie/week', {
  query: {
    api_key: '8301a21598f8b45668d5711a814f01f6',
  }
})


</script>

<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">Index</h1>
  </div>
</template>

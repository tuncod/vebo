<script setup>
const { src } = defineProps(['src'])
</script>
<template>
  <img
    class="card-poster"
    :src="'https://image.tmdb.org/t/p/w500' + src"
     alt="title"
     loading="lazy"
    decoding="async"
  />
</template>


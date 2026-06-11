<script setup>
const { poster } = defineProps(['poster'])
</script>
<template>
  <div
    class="card"
    tabindex="0"
    role="button"
    aria-label="title"
  >
    <MediaPoster :src="poster" />
  </div>
</template>
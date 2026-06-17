<script setup lang="ts">
const { data: movies } = await useTmdb('trending/movie/week')
</script>
<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">{{ $t('index') }}</h1>
<<<<<<< HEAD
    {{ movies }}
=======

>>>>>>> 45e997079d1a09d9336fa99c7ccd6c4cf0f19241
    <MediaScroll :items="[]" title="Popular — شائع" />
  </div>
</template>

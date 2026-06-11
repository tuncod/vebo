<script setup lang="ts">

const data = await useTmdb('trending/movie/week')

onMounted(() => {
  console.log(`the component is now mounted.`)
  setInterval(() => console.log(data), 3000)
})
</script>

<template>
  <div>
    <h1 class="text-4xl text-red-600 mt-26">Index</h1>

    {{ data }}
  </div>
</template>

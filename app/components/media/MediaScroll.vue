<script setup>
const { items, title } = defineProps(['items', 'title'])
</script>
<template>
  <section class="section">
    <div class="section-header">
      <h2>{{ title }}</h2>
    </div>

    <div class="scroll-row">
      <MediaCard v-for="item in items" :poster="item.poster_path" />
    </div>
  </section>
</template>

<script setup>
const { items, title } = defineProps(['items', 'title'])
</script>
<template>
  <section class="section w-full px-3">
    <div class="section-header w-full">
      <h3 class="text-xl mt-10 mb-2">{{ title }}</h3>
    </div>

    <div class="scroll-row flex w-[calc(100%_+_var(--spacing) * -3)] overflow-x-auto gap-2 -mx-3 px-3" id="selection" style="scroll-snap-type: x mandatory;">
      <UiMediaCard v-for="item in items" :poster="item.poster_path" :title="item.original_title" />
    </div>
  </section>
</template>

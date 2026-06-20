<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <section class="section w-full">
    <div v-if="props.title" class="section-header w-full">
      <h3 class="text-xl my-2">{{ props.title }}</h3>
    </div>

    <div class="scroll-row flex w-[calc(100%_+_var(--spacing) * -3)] overflow-x-auto gap-2 my-3 -mx-3 px-3 no-scrollbar" id="selection" style="scroll-snap-type: x mandatory;">
      <!-- <UiMediaCard v-for="item in items" :poster="item.poster_path" :title="item.original_title" :score="item.vote_average" :year="item.release_date" /> -->
      <!-- <slot /> -->
      <slot v-for="item in items" :key="item.id" v-bind="item" />
    </div>
  </section>
</template>

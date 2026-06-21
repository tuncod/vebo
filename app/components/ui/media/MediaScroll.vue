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
    <div v-if="props.title" class="section-header flex w-full justify-between items-center">
      <h3 class="text-xl my-2">{{ props.title }}</h3>
      <NuxtLink to="/" class="text-xs text-spring-600">View All</NuxtLink>
    </div>

    <div class="scroll-row flex w-[calc(100%_+_var(--spacing) * -3)] overflow-x-auto gap-3 my-3 -mx-3 px-3 snap-x snap-mandatory no-scrollbar" id="selection">
      <slot v-for="item in items" :key="item.id" name="item" v-bind="item" />
    </div>
  </section>
</template>

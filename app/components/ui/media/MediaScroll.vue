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
  path: {
    type: String,
    required: false,
  },
  pathName: {
    type: String,
    required: false,
    default: 'View All',
  },
})
</script>

<template>
  <section class="section w-full">
    <div class="section-header flex w-full justify-between items-center" v-if="props.title || props.path">
      <h3 class="text-xl my-2" v-if="props.title">{{ props.title }}</h3>
      <NuxtLink class="text-xs text-spring-600" v-if="props.path" to="/">{{ props.pathName }}</NuxtLink>
    </div>

    <div class="scroll-row flex w-[calc(100%_+_var(--spacing) * -3)] overflow-x-auto gap-3 my-3 -mx-3 px-3 snap-x snap-mandatory no-scrollbar" id="selection">
      <slot v-for="item in items" v-bind="item" :key="item.id" name="item" />
    </div>
  </section>
</template>

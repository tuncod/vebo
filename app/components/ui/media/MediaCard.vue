<script setup>
const props = defineProps({
  link: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  poster: {
    type: String,
    required: true,
  },
  score: {
    type: String | Number,
    required: false,
  },
  year: {
    type: String | Number,
    required: false,
  },
})

const score = computed(() => Number(props.score).toFixed())
const year = computed(() => props.year.split("-")[0])
</script>
<template>
        <NuxtLink :to="props.link" class="card relative w-[130px] h-auto shrink-0 hover:scale-90 active:scale-95 transition">
          <div class="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">
            <UiMediaPoster :src="props.poster" />
            <div class="absolute py-1 px-2 left-0 right-0 bottom-0" style="background: linear-gradient(to top, rgba(0,0,0,0.85) 25%, transparent 100%);">
              <div v-if="props.title" class="text-white text-sm text-shadow-md">{{ props.title }}</div>
              <div class="text-zinc-300 text-xs mb-2 text-shadow-md">
                <span v-if="props.year">{{ year }}</span>
                <span v-if="props.year && props.score"> • </span>
                <span v-if="props.score">{{ score }}/10</span>
              </div>
            </div>
          </div>
          <div class="py-1 hidden">
              <div class="text-zinc-800 dark:text-zinc-300 text-sm text-nowrap">{{ props.title }}</div>
              <div class="text-zinc-600 dark:text-zinc-500 text-xs mb-2">2026 • Drama</div>
            </div>
        </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  link?: string
  title?: string
  poster: string
  score?: string | number
  year?: string | number
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  score: 0,
  year: '1900',
  loading: false,
})

const score = computed(() => Number(props.score).toFixed())

const year = computed(() => String(props.year).split('-')[0])
</script>

<template>
  <div class="aspect-[2/3] overflow-hidden rounded-xl animate-pulse bg-slate-200 dark:bg-zinc-800" v-if="props.loading"></div>
  <NuxtLink class="card relative w-[130px] h-auto shrink-0 hover:scale-90 active:scale-95 transition" v-else :to="props.link">
    <div class="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">
      <UiMediaPoster :src="props.poster" />
      <div class="absolute py-1 px-2 left-0 right-0 bottom-0 bg-gradient-to-t from-black/85 from-25% to-transparent">
        <div class="text-white text-sm text-shadow-md" v-if="props.title">{{ props.title }}</div>
        <div class="text-zinc-300 text-xs mb-2 text-shadow-md [&>*:not(:last-child)]:after:content-['•'] [&>*:not(:last-child)]:after:mx-1.5">
          <span v-if="props.year">{{ year }}</span>
          <span v-if="props.score !== undefined && props.score !== null">{{ score }}/10</span>
        </div>
      </div>
    </div>
    <div class="py-1 hidden">
      <div class="text-zinc-800 dark:text-zinc-300 text-sm text-nowrap">{{ props.title }}</div>
      <div class="text-zinc-600 dark:text-zinc-500 text-xs mb-2">2026 • Drama</div>
    </div>
  </NuxtLink>
</template>

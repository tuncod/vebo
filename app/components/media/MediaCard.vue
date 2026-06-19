<script setup>
const { poster, title } = defineProps(['poster', 'title'])
</script>
<template>
        <div class="card relative w-[130px] h-auto shrink-0 hover:scale-90 active:scale-95 transition">
          <div class="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-100 dark:bg-zinc-800">
            <MediaPoster :src="poster" />
            <div class="absolute py-1 px-2 left-0 right-0 bottom-0 hidden" style="background: linear-gradient(to top, rgba(0,0,0,0.85) 25%, transparent 100%);">
              <div class="text-white text-sm">{{ title }}</div>
              <div class="text-zinc-300 text-xs mb-2">2026 • Drama</div>
            </div>
          </div>
          <div class="py-1 hiddenk">
              <div class="text-zinc-800 dark:text-zinc-300 text-sm">{{ title }}</div>
              <div class="text-zinc-600 dark:text-zinc-500 text-xs mb-2">2026 • Drama</div>
            </div>
        </div>
</template>

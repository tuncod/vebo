<script setup lang="ts">
const pageRef = ref<HTMLElement | null>(null)

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const { pullDistance, isRefreshing, progress } = usePullToRefresh(pageRef, {
  onRefresh: async () => {
    await delay(1000 * 10)
    window.location.reload() // or your own fetch/refresh logic
  },
  threshold: 70,
})

const isRefreshing2 = ref(false)
const isRefreshing3 = computed(() => isRefreshing.value)
</script>

<template>
  <div ref="pageRef" class="min-h-screen overflow-y-auto">
    <!-- Pull indicator -->
    <div
      class="relative flex items-center justify-center overflow-hidden transition-[height] bg-zinc-200 duration-200"
      :style="{ height: `calc(${pullDistance}px + 1rem)` }"
    >
      <div class="absolute inset-0 bg-gradient-to-br from-pink-600 via-red-500 via-80% to-orange-500"></div>
      <div
        class="relative z-10 h-6 w-6 rounded-full border-2 border-zinc-50 border-t-zinc-400"
        :class="isRefreshing ? 'animate-spin' : ''"
        :style="!isRefreshing ? { transform: `rotate(${progress * 360}deg)` } : {}"
      />
      <div class="absolute inset-x-0 bottom-0 w-full bg-white h-3 rounded-t-3xl"></div>
    </div>

    <!-- Page content -->
    bfjcjbcbcjfjjf <span @click="isRefreshing2 = !isRefreshing2">{{ isRefreshing }}</span> {{ progress }} | {{ pullDistance }}
  </div>
</template>
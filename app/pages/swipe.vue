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
      class="flex items-center justify-center overflow-hidden transition-[height] duration-200"
      :style="{ height: `${pullDistance}px` }"
    >
      <div
        class="h-6 w-6 rounded-full border-2 border-slate-400 border-t-slate-900"
        :class="isRefreshing ? 'animate-spin' : ''"
        :style="!isRefreshing ? { transform: `rotate(${progress * 360}deg)` } : {}"
      />
    </div>

    <!-- Page content -->
    bfjcjbcbcjfjjf <span @click="isRefreshing2 = !isRefreshing2">{{ isRefreshing }}</span> {{ progress }} | {{ pullDistance }}
  </div>
</template>
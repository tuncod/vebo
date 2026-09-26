<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import { useSwipe } from '@vueuse/core'

const containerRef = useTemplateRef('container')
const refreshing = ref(false)
const pullDistance = ref(0)

const { isSwiping, direction, lengthY } = useSwipe(containerRef, {
  threshold: 50,
  onSwipeEnd: (e, direction) => {
    // If swiping down and pulled enough distance
    if (direction === 'down' && lengthY.value < -100) {
      handleRefresh()
    } else {
      pullDistance.value = 0
    }
  }
})

async function handleRefresh() {
  refreshing.value = true
  // Perform your data fetching / refresh logic here
  await new Promise((resolve) => setTimeout(resolve, 1500))
  refreshing.value = false
  pullDistance.value = 0
}
</script>

<template>
  <div ref="container" class="overflow-y-auto h-screen">
    <div v-if="refreshing" class="p-4 text-center">Refreshing...</div>
    <!-- Your content here -->bfnfjf
  </div>
</template>

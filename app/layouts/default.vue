<script setup lang="ts">
  onMounted(() => {
    document.addEventListener('contextmenu', (e) => e.preventDefault())
  })
</script>

<template>
  <NuxtLoadingIndicator />
  <main class="font-noto-sans w-full min-h-screen bg-white dark:bg-[#111] select-none" role="main" aria-live="polite">
    <slot />
  </main>
</template>

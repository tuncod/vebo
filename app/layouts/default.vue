<script setup lang="ts">
  document.addEventListener('contextmenu', (e) => e.preventDefault())
</script>

<template>
  <main class="w-full min-h-screen bg-white dark:bg-[#111] select-none" role="main" aria-live="polite">
    <slot />
  </main>
</template>

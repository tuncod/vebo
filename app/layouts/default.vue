<script setup lang="ts">
const { localeProperties } = useI18n()

const dir = computed(() => localeProperties.value.dir || 'ltr')
const lang = computed(() => localeProperties.value.code)

useHead({
  htmlAttrs: {
    dir,
    lang,
  }
})

onMounted(() => {
  document.addEventListener('contextmenu', (e) => e.preventDefault())
})
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="font-body w-full min-h-screen">
    <main class="w-full min-h-screen bg-white dark:bg-[#111] select-none" role="main" aria-live="polite">
      <slot />
    </main>
    <div class="w-full h-16"></div>
    <div class="w-full h-16 fixed bottom-0 left-0 right-0 bg-white/40 backdrop-filter backdrop-blur-lg border-t border-zinc-200/40 z-20"></div>
  </div>
</template>

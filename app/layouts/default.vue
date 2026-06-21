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
  <main class="font-body w-full min-h-screen bg-white dark:bg-[#111] select-none" role="main" aria-live="polite">
    <slot />
  </main>
</template>

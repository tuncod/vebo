<script setup lang="ts">
const { localeProperties } = useI18n()

const dir = computed(() => localeProperties.value.dir || 'ltr')
const lang = computed(() => localeProperties.value.code)

useHead({
  htmlAttrs: {
    dir,
    lang,
  },
})

const navbar = [
  {
    key: 'home',
    icon: 'home',
    path: '/',
  },
  {
    key: 'discover',
    icon: 'earth',
    path: '/discover',
  },
  {
    key: 'watchlist',
    icon: 'heart',
    path: '/watchlist',
  },
  {
    key: 'settings',
    icon: 'settings',
    path: '/settings',
  },
  {
    key: 'auth',
    icon: 'user',
    path: '/auth',
  },
]

onMounted(() => {
  document.addEventListener('contextmenu', (e) => e.preventDefault())
})
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="font-body w-full min-h-screen bg-white dark:bg-[#111] select-none">
    <main class="w-full min-h-screen" role="main" aria-live="polite">
      <slot />
    </main>
    <div class="w-full h-16"></div>
    <div
      class="flex justify-between items-center w-full h-16 fixed bottom-0 left-0 right-0 bg-white/40 backdrop-filter backdrop-blur-lg border-t border-zinc-200/40 z-20 lg:hidden"
    >
      <NuxtLink class="" v-for="item in navbar" :to="item.path">
        <span>{{ $t(item.key) }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RiHomeFill } from '@remixicon/vue'

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
    icon: RiHomeFill,
    path: '/',
  },
  {
    key: 'discover',
    icon: RiHomeFill,
    path: '/discover',
  },
  {
    key: 'watchlist',
    icon: RiHomeFill,
    path: '/watchlist',
  },
  {
    key: 'settings',
    icon: RiHomeFill,
    path: '/settings',
  },
  {
    key: 'auth',
    icon: RiHomeFill,
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
        <span><component :is="item.icon" size="28px" /></span>
      </NuxtLink>
    </div>
  </div>
</template>

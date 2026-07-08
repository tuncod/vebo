<script setup lang="ts">
import { RiHomeFill } from '@remixicon/vue'
// import { House } from '@lucide/vue'

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
    // icon: House,
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
  <div class="font-body w-full min-h-screen mb-16 md:mb-0 bg-white dark:bg-[#111] select-none">
    <main class="w-full md:w-2/3 min-h-screen" role="main" aria-live="polite">
      <slot />
    </main>
    <div
      class="flex justify-between items-center w-full h-16 px-4 fixed bottom-0 left-0 right-0 bg-white/40 backdrop-filter backdrop-blur-lg border-t border-zinc-200/40 z-20 md:hidden"
    >
      <NuxtLink class="" v-for="item in navbar" :to="item.path">
        <div class="flex flex-col justify-center items-center w-full shrink-0">
          <component class="size-8" :is="item.icon" />
          <span class="text-sm">{{ $t(item.key) }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

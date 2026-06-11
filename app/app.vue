<script setup lang="ts">

const colorMode = useColorMode()

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const theme = ref('light')

const navLinks = [
  { route: '/',          label: 'nav_home',      icon: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
  { route: '/search',    label: 'nav_search',    icon: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
  { route: '/favorites', label: 'nav_favorites', icon: '<path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>' },
  { route: '/watchlist', label: 'nav_watchlist', icon: '<path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>' },
  { route: '/settings',  label: 'nav_settings',  icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>' },
]

// Routing
// const route = ref('/')
const route = useRoute()
const sidebarOpen = ref(false)

const themeToggle = () => {
  // document.documentElement.classList.toggle('dark')
  // document.documentElement.classList.toggle('light')
  theme.value === 'light' ? theme.value = 'dark' : theme.value = 'light'
  colorMode.preference === 'light' ? colorMode.preference = 'dark' : colorMode.preference = 'light'
  locale.value === 'ar' ? setLocale('en') : setLocale('ar')
  console.log(colorMode.preference)
  console.log(locale.value)
}

</script>

<template>
  <div class="app">

    <div :class="theme" /> 

    <nav :class="['sidebar', { open: sidebarOpen }]" role="navigation" aria-label="Main navigation">
      <div class="sidebar-header">
        <a class="nav-logo" href="/">
          <span class="logo-icon">◈</span>
          <span class="logo-text">CineVault</span>
        </a>
      </div>
      <ul class="nav-links" role="list">
        <li v-for="link in navLinks" :key="link.route">
          <a
            class="nav-link"
            :class="{ active: route.path == link.route }"
            :aria-label="link.label"
            :href="link.route"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" v-html="link.icon"></svg>
            <span>{{ link.label }}</span>
          </a>
        </li>
      </ul>
    </nav>

    <header class="mobile-header" role="banner">
      <button class="mobile-menu-btn" :aria-expanded="String(sidebarOpen)" aria-controls="sidebar" aria-label="Open menu" @click="sidebarOpen=!sidebarOpen">
        <span></span><span></span><span></span>
      </button>
      <a class="nav-logo" @click="themeToggle">
        <span class="logo-icon">◈</span>
        <span class="logo-text">CineVault</span>
      </a>
      <a class="mobile-search-btn" href="/search" aria-label="Search">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </a>
    </header>

    <h1 class="text-4xl text-red-600 mt-26">Vebo TV {{ route.path }}</h1>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

  </div>
</template>

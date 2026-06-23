<script setup lang="ts">
const { locale, locales } = useI18n()
const colorMode = useColorMode()

function changeLocale(lang: string) {
  locale.value = lang
}

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>
<template>
  <div class="mt-6 px-3 flex-col">
    <h1 class="text-4xl text-red-600 mt-26">settings</h1>
    <label>Language</label>
    <select
      :value="locale"
      @change="changeLocale(($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="lang in locales"
        :key="lang.code"
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
    <div class="flex items-center gap-3">
    <span>☀️</span>

    <button
      class="relative h-7 w-14 rounded-full transition-colors"
      :class="isDark ? 'bg-blue-600' : 'bg-gray-300'"
      @click="isDark = !isDark"
    >
      <div
        class="absolute top-1 h-5 w-5 rounded-full bg-white transition-transform"
        :class="isDark ? 'translate-x-8' : 'translate-x-1'"
      />
    </button>

    <span>🌙</span>
  </div>
  </div> 
</template>

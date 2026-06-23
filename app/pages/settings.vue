<script setup lang="ts">
const { setLocale, locale, locales } = useI18n()
const colorMode = useColorMode()

const language = computed({
  get: () => locale.value,
  set: value => {
    setLocale(value)
  }
})

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
    <select v-model="language">
      <option v-for="item in locales" :key="item.code" :value="item.code">
        {{ item.name }}
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

<script setup lang="ts">
const { setLocale, locale } = useI18n()
const colorMode = useColorMode()

const availableLanguages = [
  {
    name: 'English',
    code: 'en-US',
    dir: 'ltr',
  },
  {
    name: 'العربية',
    code: 'ar-TN',
    dir: 'rtl',
  }
]

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
  <div class="px-3 flex-col">
  
    <div class="font-heading">
      <h1 class="text-5xl font-black my-8">Settings</h1>
    </div>

    <div class="">
      <h3 class="mb-2 text-xl text-zinc-700 dark:text-zinc-200 font-bold">Appearance</h3>

      <div class="px-2">
        <div class="flex flex-row items-center p-4 rounded-t-xl bg-zinc-50 dark:bg-zinc-900">
          <div class="w-full flex flex-col">
            <span class="text-base text-zinc-900 dark:text-zinc-100 font-bold mb-1">Language</span>
            <span class="text-xs text-zinc-600 dark:text-zinc-400">Change Language You Want</span>
          </div>
          <div>
            <ULocaleSelect :model-value="language"
              :locales="availableLanguages"
              @update:model-value="setLocale($event)" />
          </div>
        </div>
        <div class="flex flex-row items-center p-4 rounded-b-xl bg-zinc-50">
          <div class="w-full flex flex-col">
            <span class="text-base text-zinc-900 dark:text-zinc-100 font-bold mb-1">Theme</span>
            <span class="text-xs text-zinc-600 dark:text-zinc-400">Change theme You Want</span>
          </div>
          <div>
            <UColorModeSwitch size="xl" color="neutral" />
          </div>
        </div>
      </div>

    </div>

  </div> 
</template>

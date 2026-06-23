<script setup lang="ts">
import * as localess from '@nuxt/ui/locale'

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

    <div class="max-w-sm mx-auto">
      <label for="languages" class="block mb-2.5 text-sm font-medium text-heading">Select an option</label>
      <select v-model="language" id="languages" class="block w-full px-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body">
        <option selected>Choose a language</option>
        <option v-for="item in locales" :key="item.code" :value="item.code">
            {{ item.name }}
        </option>
      </select>
    </div>

    <div class="max-w-sm mx-auto">
      <label class="w-80 inline-flex cursor-pointer p-4 bg-neutral-primary-soft border border-default rounded-base shadow-xs">
        <input type="checkbox" v-model="isDark" class="sr-only peer">
        <div class="shrink-0 relative w-9 h-5 bg-neutral-quaternary peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-soft dark:peer-focus:ring-brand-soft rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-buffer after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand"></div>
        <div class="ms-2.5 select-none">
          <p class="text-sm font-medium text-heading mb-1">Weekly newsletter</p>
          <p class="text-sm font-normal text-body">Save my credentials for easier sign-in in the future.</p>
        </div>
      </label>
    </div>


    <div class="w-full flex">
      <div class="w-full">
        <span>Change language</span>
      </div>
      <div class="">
        <ULocaleSelect :model-value="language" "locales="Object.values(localess)" />
      </div>
    </div>
    <div class="w-full flex">
      <div class="w-full">
        <span>Change Color mode</span>
      </div>
      <div class="">
        <UColorModeSwitch size="xl" color="neutral" />
      </div>
    </div>

  </div> 
</template>

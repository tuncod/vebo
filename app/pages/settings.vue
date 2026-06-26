<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/sh/select'
const { setLocale, locale } = useI18n()
const colorMode = useColorMode()
const timezoneStore = useTimezoneStore()

const availableLanguages = [
  {
    name: 'English',
    code: 'en-US',
    dir: 'ltr',
    emoji: '🇺🇸',
  },
  {
    name: 'العربية',
    code: 'ar-TN',
    dir: 'rtl',
    emoji: '🇹🇳',
  }
]

const availableTimezones = [
  'Africa/Nouakchott', // Mauritania
  'Africa/Algiers',    // Algeria
  'Africa/Tunis',      // Tunisia
  'Africa/Cairo',      // Egypt
  'Africa/Tripoli',    // Libya
  'Africa/Khartoum',   // Sudan
  'Africa/Djibouti',   // Djibouti
  'Africa/Mogadishu',  // Somalia
  'Indian/Comoro',     // Comoros

  'Asia/Riyadh',       // Saudi Arabia
  'Asia/Baghdad',      // Iraq
  'Asia/Kuwait',       // Kuwait
  'Asia/Qatar',        // Qatar
  'Asia/Bahrain',      // Bahrain
  'Asia/Aden',         // Yemen
  'Asia/Amman',        // Jordan
  'Asia/Damascus',     // Syria
  'Asia/Gaza',         // Palestine (Gaza)
  'Asia/Hebron',       // Palestine (West Bank)

  'Asia/Dubai',        // United Arab Emirates
  'Asia/Muscat',       // Oman
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

const timezone = computed({
  get: () => timezoneStore.timezone.value,
  set: value => {
    timezoneStore.setTimezone(value)
  }
})
const sslect = ref('')
</script>
<template>
  <div class="px-3 flex-col">
  
    <div class="font-heading">
      <h1 class="text-5xl font-black my-8">Settings</h1>
    </div>

    <div class="">
      <h3 class="mb-2 text-xl text-zinc-700 dark:text-zinc-200 font-bold">Appearance</h3>

      <div class="px-2 [&>:first-child]:rounded-t-xl [&>:last-child]:rounded-b-xl">
        <div class="flex flex-row items-center p-4 bg-zinc-50 dark:bg-zinc-900">
          <div class="w-full flex flex-col">
            <span class="text-base text-zinc-900 dark:text-zinc-100 font-bold mb-1">Language</span>
            <span class="text-xs text-zinc-600 dark:text-zinc-400">Change Language You Want</span>
          </div>
          <div>
            <Select v-model="language">
              <SelectTrigger class="border-0 shadow-none">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="lang in availableLanguages" :value="lang.code" :key="lang.code">
                  {{ lang.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="flex flex-row items-center p-4 bg-zinc-50 dark:bg-zinc-900">
          <div class="w-full flex flex-col">
            <span class="text-base text-zinc-900 dark:text-zinc-100 font-bold mb-1">Timezone</span>
            <span class="text-xs text-zinc-600 dark:text-zinc-400">Change Timezone You Want</span>
          </div>
          <div>
            <Select v-model="timezone">
              <SelectTrigger class="border-0 shadow-none">
                <SelectValue placeholder="Select a timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem v-for="tmzn in availableTimezones" :value="tmzn" :key="tmzn">
                  {{ tmzn }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div class="flex flex-row items-center p-4 bg-zinc-50 dark:bg-zinc-900">
          <div class="w-full flex flex-col">
            <span class="text-base text-zinc-900 dark:text-zinc-100 font-bold mb-1">Theme</span>
            <span class="text-xs text-zinc-600 dark:text-zinc-400">Change theme You Want</span>
          </div>
          <div>
            <UColorModeSwitch size="xl" />
          </div>
        </div>
      </div>

    </div>




  </div> 
</template>

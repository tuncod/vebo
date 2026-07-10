import { defineStore, skipHydrate } from 'pinia'
import { useCookie } from '@vueuse/core'

export const useTimezoneStore = defineStore('preferences.timezone', () => {
  const timezone = skipHydrate(useLocalStorage('preferences.timezone', 'Africa/Tunis'))

  const setTimezone = (value: string) => {
    timezone.value = value
  }

  return {
    timezone,
    setTimezone,
  }
})

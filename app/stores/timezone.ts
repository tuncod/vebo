import { defineStore, skipHydrate } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useTimezoneStore = defineStore('timezone', () => {
  const timezone = skipHydrate(
    useLocalStorage('vb_timezone', 'Europe/Madrid')
  )

  const setTimezone = (value: string) => {
    timezone.value = value
  }

  return {
    theme,
    setTimezone,
  }
})

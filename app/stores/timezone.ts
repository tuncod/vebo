import { skipHydrate } from 'pinia'

export const useTimezoneStore = defineStore('timezone', () => {
  const timezone = ref('Europe/Madrid')

  const setTimezone = (value: string) => {
    timezone.value = value
  }

  return { timezone, setTimezone }
})

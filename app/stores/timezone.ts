import { skipHydrate } from 'pinia'

export const useTimezoneStore = defineStore('timezone', () => {
  const timezone = skipHydrate(
    ref('Europe/Madrid')
  )

  const setTimezone = (value: string) => {
    timezone.value = value
  }

  return { timezone, setTimezone }
})

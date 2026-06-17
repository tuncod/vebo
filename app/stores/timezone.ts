export const useUserStore = defineStore('timezone', () => {
  const timezone = ref('Europe/Madrid')

  const setTimezone = (value: string) => {
    timezone.value = value
  }

  return { timezone, setTimezone }
})

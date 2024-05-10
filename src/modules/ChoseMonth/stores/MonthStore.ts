import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMonthStore = defineStore('monthStore', () => {
  const chosedMonth = ref<null | string>(null)

  const setMonth = (time: Date) => {
    chosedMonth.value = time.toISOString()
  }

  const getTimeNow = () => new Date()

  const getRangeMonth = () => {
    const date = new Date(chosedMonth.value || getTimeNow().toISOString())

    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    const startTime = new Date(currentYear, currentMonth, 1)
    const endTime = new Date(currentYear, currentMonth + 1, 0)

    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    }
  }

  setMonth(getTimeNow())

  const $reset = () => {
    chosedMonth.value = null
  }

  return { chosedMonth, setMonth, getRangeMonth, $reset }
})

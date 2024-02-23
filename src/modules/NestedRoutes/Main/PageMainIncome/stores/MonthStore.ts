import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMonthStore = defineStore('monthStore', () => {
  const chosedMonth = ref<string>(new Date().toISOString())

  const setMonth = (time: Date) => {
    chosedMonth.value = time.toISOString()
  }

  const getRangeMonth = () => {
    const date = new Date(chosedMonth.value)

    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()

    const startTime = new Date(currentYear, currentMonth, 1)
    const endTime = new Date(currentYear, currentMonth + 1, 0)

    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    }
  }

  return { chosedMonth, setMonth, getRangeMonth }
})

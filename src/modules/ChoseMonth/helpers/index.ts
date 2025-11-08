import { useMonthStore } from '@/modules/ChoseMonth'
import { storeToRefs } from 'pinia'

export const setNeighborMonth = (side: 'previous' | 'next') => {
  const monthStore = useMonthStore()
  const { chosedMonth } = storeToRefs(monthStore)

  if (!chosedMonth.value) return

  const chosedMonthFormatDate = new Date(chosedMonth.value)
  let newMonth = chosedMonthFormatDate.getMonth()

  switch (side) {
    case 'previous':
      newMonth = chosedMonthFormatDate.getMonth() - 1
      break
    case 'next':
      newMonth = chosedMonthFormatDate.getMonth() + 1
      break
  }

  monthStore.setMonth(new Date(chosedMonthFormatDate.setMonth(newMonth)))
}

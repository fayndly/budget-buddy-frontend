import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { ITransaction } from '@/utils/types/data/data.types'
import type { IDataTransaction } from '@/utils/API/types/data.types'

import { transactionApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import { useBarCheckStore } from '@/modules/BarCheck'
import { useMonthStore } from './MonthStore'
import { storeToRefs } from 'pinia'

export const useMainIncomeStore = defineStore('mainIncome', () => {
  const barCheckStore = useBarCheckStore()
  const monthStore = useMonthStore()

  const { chosedCheck } = storeToRefs(barCheckStore)
  const { chosedMonth } = storeToRefs(monthStore)

  const transactions = ref<ITransaction[]>([])
  const isTransactionsIncomeLoading = ref<boolean>(false)

  watch(chosedCheck, async () => {
    if (chosedCheck.value) {
      await uploadTransactions()
    }
  })

  watch(chosedMonth, async () => {
    if (chosedMonth.value) {
      await uploadTransactions()
    }
  })

  const uploadTransactions = async () => {
    isTransactionsIncomeLoading.value = true
    try {
      const checksId = chosedCheck.value?.id
      if (!checksId) console.log(checksId)

      const { data } = await transactionApi.getAll(
        {
          check: checksId,
          type: 'income'
        },
        monthStore.getRangeMonth(),
        { category: true, currency: true }
      )
      const formatCategories = clearData<IDataTransaction[], ITransaction[]>(data)
      transactions.value = formatCategories
    } catch (err) {
      transactions.value = []
      console.log(err)
    } finally {
      isTransactionsIncomeLoading.value = false
    }
  }

  return { transactions, uploadTransactions }
})

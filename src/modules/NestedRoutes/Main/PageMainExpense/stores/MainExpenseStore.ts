import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import type { ITransaction } from '@/utils/types/data/data.types'
import type { IDataTransaction } from '@/utils/types/data/serverData.types'

// import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import { useBarCheckStore } from '@/modules/BarCheck'

export const useMainExpenseStore = defineStore('mainExpense', () => {
  const barCheckStore = useBarCheckStore()
  const { chosedCheck } = storeToRefs(barCheckStore)

  const transactions = ref<ITransaction[]>([])

  const getTransactions = computed(() => transactions.value)

  const uploadTransactions = async () => {
    try {
      // const { data } = await apiManager.getTransactions({
      //   check: chosedCheck.value?.id,
      //   type: 'expense'
      // })
      // const formatCategories = clearData<IDataTransaction[], ITransaction[]>(data)
      // transactions.value = formatCategories
    } catch (err) {
      transactions.value = []
      console.log(err)
    }
  }

  return { transactions, uploadTransactions, getTransactions }
})

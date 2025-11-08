import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { IFormatTransactionsList } from '@/utils/types/data/data.types'

import { useMainExpenseStore } from './MainExpenseStore'
import { storeToRefs } from 'pinia'

import { getFormatTransactionsList } from '@/utils/helpers/getFormatTransactionsList'

export const useTransactionsListExpenseStore = defineStore('transactionsListExpense', () => {
  const mainExpenseStore = useMainExpenseStore()

  const { transactions } = storeToRefs(mainExpenseStore)

  const isTransactionsListExpenseLoading = ref<boolean>(false)

  const formatTransactionsList = ref<IFormatTransactionsList[]>([])

  watch(transactions, () => {
    console.log('useTransactionsListExpenseStore updated')

    uploadTransactions()
  })

  const uploadTransactions = () => {
    isTransactionsListExpenseLoading.value = true
    formatTransactionsList.value.length = 0
    formatTransactionsList.value.push(...getFormatTransactionsList(transactions.value))
    isTransactionsListExpenseLoading.value = false
  }

  return {
    transactions,
    formatTransactionsList,
    uploadTransactions,
    isTransactionsListExpenseLoading
  }
})

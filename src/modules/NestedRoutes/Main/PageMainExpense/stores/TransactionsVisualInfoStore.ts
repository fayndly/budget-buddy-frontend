import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { IFormatTransactionsVisualInfo } from '@/utils/types/data/data.types'

import { useMainExpenseStore } from './MainExpenseStore'
import { storeToRefs } from 'pinia'

import { getFormatTransactionsVisualInfo } from '../helpers/getFormatTransactionsVisualInfo'

export const useTransactionsVisualInfoStore = defineStore('transactionsVisualInfoExpense', () => {
  const mainExpenseStore = useMainExpenseStore()

  const { transactions } = storeToRefs(mainExpenseStore)

  const isTransactionsVisualInfoExpenseLoading = ref<boolean>(false)

  const formatTransactionsVisualInfo = ref<IFormatTransactionsVisualInfo[]>([])

  watch(transactions, () => {
    uploadTransactions()
  })

  const uploadTransactions = () => {
    isTransactionsVisualInfoExpenseLoading.value = true
    formatTransactionsVisualInfo.value.length = 0
    formatTransactionsVisualInfo.value.push(...getFormatTransactionsVisualInfo(transactions.value))
    isTransactionsVisualInfoExpenseLoading.value = false
  }

  return {
    transactions,
    formatTransactionsVisualInfo,
    uploadTransactions,
    isTransactionsVisualInfoExpenseLoading
  }
})

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { IFormatTransactionsVisualInfo } from '@/utils/types/data/data.types'

import { storeToRefs } from 'pinia'
import { useMainIncomeStore } from './MainIncomeStore'

import { getFormatTransactionsVisualInfo } from '../helpers/getFormatTransactionsVisualInfo'

export const useTransactionsVisualInfoStore = defineStore('transactionsVisualInfoIncome', () => {
  const mainIncomeStore = useMainIncomeStore()
  const { transactions } = storeToRefs(mainIncomeStore)

  const formatTransactionsVisualInfo = ref<IFormatTransactionsVisualInfo[]>([])
  const isTransactionsVisualInfoIncomeLoading = ref<boolean>(false)

  watch(transactions, () => {
    uploadTransactions()
  })

  const uploadTransactions = () => {
    isTransactionsVisualInfoIncomeLoading.value = true
    formatTransactionsVisualInfo.value.length = 0
    formatTransactionsVisualInfo.value.push(...getFormatTransactionsVisualInfo(transactions.value))
    isTransactionsVisualInfoIncomeLoading.value = false
  }

  return {
    transactions,
    formatTransactionsVisualInfo,
    uploadTransactions,
    isTransactionsVisualInfoIncomeLoading
  }
})

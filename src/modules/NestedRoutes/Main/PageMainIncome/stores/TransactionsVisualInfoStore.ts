import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { IFormatTransactionsVisualInfo } from '@/utils/types/data/data.types'

import { useMainIncomeStore } from './MainIncomeStore'
import { storeToRefs } from 'pinia'

import { getFormatTransactionsVisualInfo } from '../helpers/getFormatTransactionsVisualInfo'

export const useTransactionsVisualInfoStore = defineStore('transactionsVisualInfoIncome', () => {
  const mainIncomeStore = useMainIncomeStore()

  const { transactions } = storeToRefs(mainIncomeStore)

  const isTransactionsVisualInfoIncomeLoading = ref<boolean>(false)

  const formatTransactionsVisualInfo = ref<IFormatTransactionsVisualInfo[]>([])

  watch(transactions, () => {
    console.log('transactions update')

    isTransactionsVisualInfoIncomeLoading.value = true
    formatTransactionsVisualInfo.value.length = 0
    formatTransactionsVisualInfo.value.push(...getFormatTransactionsVisualInfo(transactions.value))
    isTransactionsVisualInfoIncomeLoading.value = false
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

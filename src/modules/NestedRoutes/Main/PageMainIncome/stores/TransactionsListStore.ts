import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

import type { IFormatTransactionsList } from '@/utils/types/data/data.types'

import { useMainIncomeStore } from './MainIncomeStore'
import { storeToRefs } from 'pinia'

import { getFormatTransactionsList } from '@/utils/helpers/getFormatTransactionsList'

export const useTransactionsListIncomeStore = defineStore('transactionsListIncome', () => {
  const mainIncomeStore = useMainIncomeStore()

  const { transactions } = storeToRefs(mainIncomeStore)

  const isTransactionsListIncomeLoading = ref<boolean>(false)

  const formatTransactionsList = ref<IFormatTransactionsList[]>([])

  watch(transactions, () => {
    console.log('useTransactionsListIncomeStore updated')

    uploadTransactions()
  })

  const uploadTransactions = () => {
    isTransactionsListIncomeLoading.value = true
    formatTransactionsList.value.length = 0
    formatTransactionsList.value.push(...getFormatTransactionsList(transactions.value))
    isTransactionsListIncomeLoading.value = false
  }

  return {
    transactions,
    formatTransactionsList,
    uploadTransactions,
    isTransactionsListIncomeLoading
  }
})

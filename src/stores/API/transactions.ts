import { defineStore } from 'pinia'

import type { ITransaction, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataTransaction } from '@/utils/types/data/serverData.types'

// import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import { useCategoriesStore } from '@/stores/API/categories'
import { useChecksStore } from '@/stores/API/checks'
import { useCurrencyStore } from '@/stores/API/currencies'

export const useTransactionsStore = defineStore('transactionsApi', () => {
  const categoriesStore = useCategoriesStore()
  const checksStore = useChecksStore()
  const currencyStore = useCurrencyStore()

  const getTransactionById = async (
    id: TMongoObjectId,
    options?: {
      hasCurrency?: boolean
      hasCheck?: boolean
      hasCategory?: boolean
    }
  ) => {
    try {
      // const { data } = await apiManager.getTransaction(id)
      // if (!data) {
      //   return undefined
      // }
      // const formatTransaction = clearData<IDataTransaction, ITransaction>(data)
      // if (options) {
      //   if (options.hasCategory) {
      //     if (typeof formatTransaction.category === 'string') {
      //       formatTransaction.category =
      //         categoriesStore.getCategoryById(formatTransaction.category) ||
      //         formatTransaction.category
      //     }
      //   }
      //   if (options.hasCheck) {
      //     if (typeof formatTransaction.check === 'string') {
      //       formatTransaction.check =
      //         checksStore.getCheckById(formatTransaction.check) || formatTransaction.check
      //     }
      //   }
      //   if (options.hasCurrency) {
      //     if (typeof formatTransaction.currency === 'string') {
      //       formatTransaction.currency =
      //         currencyStore.getCurrencyById(formatTransaction.currency) ||
      //         formatTransaction.currency
      //     }
      //   }
      //   return formatTransaction
      // }
    } catch (error) {
      console.log(error)
    }
  }

  return { getTransactionById }
})

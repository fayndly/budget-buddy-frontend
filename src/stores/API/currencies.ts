import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ICurrency, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCurrency } from '@/utils/types/data/serverData.types'

// import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

export const useCurrencyStore = defineStore('currencyApi', () => {
  const currencies = ref<ICurrency[]>([])

  const getCurrencyById = (id: TMongoObjectId) => {
    const currency = currencies.value.find((val) => val.id === id)

    if (!currency) {
      console.log('Не удалось найти валюту')

      // await apiManager
      //   .getCurrency(id)
      //   .then((response) => {
      //     currency = clearData<IDataCurrency, ICurrency>(response.data)
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //   })
    }

    return currency
  }

  const uploadCurrencies = async () => {
    // await apiManager
    //   .getCurrencies()
    //   .then((response) => {
    //     currencies.value = clearData<IDataCurrency[], ICurrency[]>(response.data)
    //   })
    //   .catch((err) => {
    //     currencies.value = []
    //     console.log(err)
    //   })
  }

  return { currencies, uploadCurrencies, getCurrencyById }
})

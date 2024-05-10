import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ICurrency, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCurrency } from '@/utils/API/types/data.types'

import { currencyApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

export const useCurrenciesStore = defineStore('currenciesApi', () => {
  const currencies = ref<ICurrency[]>([])
  const isLoading = ref<boolean>(false)

  const getCurrencyById = async (id: TMongoObjectId) => {
    const currency = currencies.value.find((val) => val.id === id)

    if (!currency) {
      try {
        const { data } = await currencyApi.getOne(id)

        await uploadCurrencies()

        return clearData<IDataCurrency, ICurrency>(data)
      } catch (error) {
        console.log(error)

        return
      }
    }

    return currency
  }

  const uploadCurrencies = async () => {
    console.log('uploadCurrencies')

    isLoading.value = true
    try {
      const { data } = await currencyApi.getAll()

      const formatChecks = clearData<IDataCurrency[], ICurrency[]>(data)

      currencies.value = formatChecks
    } catch (err) {
      currencies.value = []
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  const $reset = () => {
    currencies.value = []
    isLoading.value = false
  }

  return { currencies, uploadCurrencies, getCurrencyById, $reset }
})

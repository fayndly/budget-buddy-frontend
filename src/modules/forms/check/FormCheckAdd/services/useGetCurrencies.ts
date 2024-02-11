import { ref } from 'vue'
import { currencyApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICurrency } from '@/utils/types/data/data.types'
import type { IDataCurrency } from '@/utils/API/types/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

export const currencies = ref<ICurrency[]>([])

export const useGetCurrencies = async () => {
  try {
    const { data } = await currencyApi.getAll()
    currencies.value = clearData<IDataCurrency[], ICurrency[]>(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)
    } else {
      console.log(error)
    }
    currencies.value = []
  }
}

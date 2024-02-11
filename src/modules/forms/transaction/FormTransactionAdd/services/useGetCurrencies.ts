import { ref } from 'vue'
import { currencyApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICurrency } from '@/utils/types/data/data.types'
import type { IDataCurrency } from '@/utils/API/types/data.types'

export const currencies = ref<ICurrency[]>([])

export const useGetCurrencies = async () => {
  try {
    const { data } = await currencyApi.getAll()
    currencies.value = clearData<IDataCurrency[], ICurrency[]>(data)
  } catch (error) {
    currencies.value = []
    console.log(error)
  }
}

import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICurrency } from '@/utils/types/data/data.types'
import type { IDataCurrency } from '@/utils/types/data/serverData.types'

export const currencies = ref<ICurrency[]>([])

export const useGetCurrencies = async () => {
  return await apiManager
    .getCurrencies()
    .then((response) => {
      currencies.value = clearData<IDataCurrency[], ICurrency[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      currencies.value = []
    })
}

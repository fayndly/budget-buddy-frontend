import { ref } from 'vue'
import { currencyApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICurrency, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCurrency } from '@/utils/types/data/serverData.types'

export const currency = ref<ICurrency | null>(null)

export const useGetOneCurrency = async (id: TMongoObjectId) => {
  // return await apiManager
  //   .getCurrency(id)
  //   .then((response) => {
  //     currency.value = clearData<IDataCurrency, ICurrency>(response.data)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     currency.value = null
  //   })
}

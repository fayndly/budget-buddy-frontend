import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ITransaction, TMongoObjectId, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataTransaction } from '@/utils/types/data/serverData.types'

export const transactions = ref<ITransaction[]>([])

export const useGetTransactions = async (
  check?: TMongoObjectId,
  type?: TTypeTransaction,
  startTime?: string,
  endTime?: string
) => {
  const params = { check, type, startTime, endTime }
  return await apiManager
    .getTransactions(params)
    .then((response) => {
      transactions.value = clearData<IDataTransaction[], ITransaction[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      transactions.value = []
    })
}

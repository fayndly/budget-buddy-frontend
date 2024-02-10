import { ref } from 'vue'
import { transactionApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ITransaction, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataTransaction } from '@/utils/types/data/serverData.types'

export const transaction = ref<ITransaction | null>(null)
export const isTransactionNotFound = ref<boolean>(false)

export const useGetOneTransaction = async (id: TMongoObjectId) => {
  isTransactionNotFound.value = false

  try {
    const { data } = await transactionApi.getOne(id, {
      currency: true,
      check: true,
      category: true
    })
    console.log(data)

    // transaction.value = clearData<IDataTransaction, ITransaction>(data)
  } catch (error) {
    console.log(error)
  }

  // return await apiManager
  //   .getTransaction(id)
  //   .then((response) => {
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     if (err.response.status === 404) isTransactionNotFound.value = true
  //     transaction.value = null
  //   })
}

import { ref } from 'vue'
import { transactionApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ITransaction, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataTransaction } from '@/utils/API/types/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

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
    transaction.value = clearData<IDataTransaction, ITransaction>(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)

      if (
        response.status === 404 ||
        response.status === 400 ||
        (typeof response.data.error === 'object' && response.data.error.name === 'CastError')
      )
        isTransactionNotFound.value = true

      transaction.value = null
    } else {
      console.log(error)
    }
  }
}

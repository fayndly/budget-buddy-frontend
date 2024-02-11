import { ref } from 'vue'
import { transactionApi } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

export const isTransactionDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const useDeleteTransaction = async (id: TMongoObjectId) => {
  postErrorText.value = null

  try {
    const { data } = await transactionApi.delete(id)

    postErrorText.value = null
    isTransactionDeleted.value = true

    console.log(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)

      postErrorText.value = response.data.message
    } else {
      console.log(error)
    }
    isTransactionDeleted.value = false
  }
}

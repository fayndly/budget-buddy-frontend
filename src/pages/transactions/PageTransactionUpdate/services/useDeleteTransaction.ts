import { ref } from 'vue'
import { transactionApi } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

export const isTransactionDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const useDeleteTransaction = async (id: TMongoObjectId) => {
  postErrorText.value = null
  return await transactionApi
    .delete(id)
    .then((response) => {
      postErrorText.value = null
      isTransactionDeleted.value = true
      console.log(response.data.id)
    })
    .catch((err) => {
      isTransactionDeleted.value = false
      console.log(err)
      postErrorText.value = err.response.data.message
    })
}

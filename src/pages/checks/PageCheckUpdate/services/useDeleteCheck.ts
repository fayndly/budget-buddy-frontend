import { ref } from 'vue'
import { checkApi } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

export const isCheckDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const useDeleteCheck = async (id: TMongoObjectId) => {
  postErrorText.value = null
  return await checkApi
    .delete(id)
    .then((response) => {
      postErrorText.value = null
      isCheckDeleted.value = true
      console.log(response)
    })
    .catch((err) => {
      isCheckDeleted.value = false
      console.log(err)
      postErrorText.value = err.response.data.message
    })
}

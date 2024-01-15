import { ref } from 'vue'
import { apiManager } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

export const isCheckDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const useDeleteCheck = async (id: TMongoObjectId) => {
  postErrorText.value = null
  return await apiManager
    .deleteCheckDelete(id)
    .then((response) => {
      postErrorText.value = null
      isCheckDeleted.value = true
      console.log(response.data.id)
    })
    .catch((err) => {
      isCheckDeleted.value = false
      console.log(err)
      postErrorText.value = err.response.data.message
    })
}

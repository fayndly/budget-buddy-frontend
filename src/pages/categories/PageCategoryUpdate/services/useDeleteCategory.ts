import { ref } from 'vue'
import { apiManager } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

export const isCategoryDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const useDeleteCategory = async (id: TMongoObjectId) => {
  postErrorText.value = null
  return await apiManager
    .deleteCategoryDelete(id)
    .then((response) => {
      postErrorText.value = null
      isCategoryDeleted.value = true
      console.log(response.data.id)
    })
    .catch((err) => {
      console.log(err)
      postErrorText.value = err.response.data.message
    })
}

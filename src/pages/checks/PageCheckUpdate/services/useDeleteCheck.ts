import { ref } from 'vue'
import { checkApi } from '@/utils/API'

import type { TMongoObjectId } from '@/utils/types/data/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

export const isCheckDeleted = ref<boolean>(false)
export const postErrorText = ref<null | string>(null)

export const useDeleteCheck = async (id: TMongoObjectId) => {
  postErrorText.value = null

  try {
    const { data } = await checkApi.delete(id)

    postErrorText.value = null
    isCheckDeleted.value = true

    console.log(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)

      postErrorText.value = response.data.message
    } else {
      console.log(error)
    }
    isCheckDeleted.value = false
  }
}

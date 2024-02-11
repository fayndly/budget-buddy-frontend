import { categoryApi } from '@/utils/API/index'
import { ref, reactive } from 'vue'

import type { TTypeTransaction } from '@/utils/types/data/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

import { getFormatValidateErrorsServer } from '@/utils/validations/validationFormat'

export const isLoading = ref<boolean>(false)

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

export const usePostCheckAdd = async (dataFields: {
  name: string
  type: TTypeTransaction | null
  color: string | null
  icon?: string | null
}): Promise<void> => {
  isLoading.value = true
  postErrorText.value = null

  if (!dataFields.icon) delete dataFields.icon

  try {
    const { data } = await categoryApi.create(dataFields)
    postErrorText.value = null
    console.log('Ответ от сервера: ', data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      postErrorText.value = response.data.message

      if (response.status === 400 && Array.isArray(response.data)) {
        postErrorText.value = null
        Object.assign(serverValidateErrors, getFormatValidateErrorsServer(response.data))
      }

      console.log(response)
    } else {
      console.log(error)
    }
  } finally {
    isLoading.value = false
  }
}

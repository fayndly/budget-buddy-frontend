import { apiManager } from '@/utils/API/index'
import type { AxiosError } from 'axios'
import { ref, reactive } from 'vue'

import type { TErrorServer } from '@/utils/types/errors'

import { getFormatValidateErrorsServer } from '@/utils/validations/validationFormat'

export const isButtonSubmitAuthLoading = ref<boolean>(false)

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

export const usePostAuthLogin = async (email: string, password: string): Promise<void> => {
  isButtonSubmitAuthLoading.value = true
  return await apiManager
    .postAuthLogin({ email, password })
    .then((response) => {
      postErrorText.value = null
      localStorage.setItem('token', response.data.token)

      console.log('Ответ от сервера: ', response)
    })
    .catch((error: AxiosError<TErrorServer, any>) => {
      postErrorText.value = 'Ошибка на сервере'

      if (error.response) {
        if ('message' in error.response.data) postErrorText.value = error.response.data.message

        if (error.response.status === 400 && Array.isArray(error.response.data)) {
          postErrorText.value = null
          Object.assign(serverValidateErrors, getFormatValidateErrorsServer(error.response.data))
        }
      }

      console.log('Ошибка сервера: ', error.response)
    })
    .finally(() => {
      isButtonSubmitAuthLoading.value = false
    })
}

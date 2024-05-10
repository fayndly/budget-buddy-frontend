import { authApi } from '@/utils/API/index'
import type { AxiosError } from 'axios'
import { ref, reactive } from 'vue'

import type { TErrorServer } from '@/utils/types/errors'

import { getFormatValidateErrorsServer } from '@/utils/validations/validationFormat'

import { useUserAuthStore } from '@/stores/UserAuthStore'

export const isButtonSubmitAuthLoading = ref<boolean>(false)

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

export const isAuthed = ref<boolean>(false)

export const usePostAuthSignup = async (
  userName: string,
  email: string,
  password: string
): Promise<void> => {
  const userAuthStore = useUserAuthStore()

  await authApi
    .signup({ userName, email, password })
    .then((response) => {
      postErrorText.value = null
      localStorage.setItem('token', response.data.token)
      isAuthed.value = true

      userAuthStore.setUserAuth(true)

      console.log(response)
    })
    .catch((error: AxiosError<TErrorServer, any>) => {
      postErrorText.value = 'Ошибка на сервере'

      isAuthed.value = false

      if (error.response) {
        if ('message' in error.response.data) postErrorText.value = error.response.data.message

        if (error.response.status === 400 && Array.isArray(error.response.data)) {
          postErrorText.value = null
          Object.assign(serverValidateErrors, getFormatValidateErrorsServer(error.response.data))
        }
      }

      userAuthStore.setUserAuth(false)

      console.log('Ошибка сервера: ', error.response)
    })
    .finally(() => {
      isButtonSubmitAuthLoading.value = false
    })
}

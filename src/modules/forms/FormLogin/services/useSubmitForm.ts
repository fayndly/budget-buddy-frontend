import { apiManager } from '@/utils/API/index'
import type { AxiosError } from 'axios'
import { ref, reactive } from 'vue'

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

interface IErrorValidateFromServer {
  location: string
  msg: string
  path: string
  type: string
  value: string
}

type TErrorServer = IErrorValidateFromServer[] | { message: string }

export const usePostAuthLogin = async (
  email: string,
  password: string
): Promise<{ success: boolean }> => {
  return await apiManager
    .postAuthLogin({ email, password })
    .then((response) => {
      postErrorText.value = null
      localStorage.setItem('token', response.data.token)

      console.log('Ответ от сервера: ', response)

      return {
        success: true
      }
    })
    .catch((error: AxiosError<TErrorServer, any>) => {
      postErrorText.value = 'Ошибка на сервере'

      if (error.response) {
        if ('message' in error.response.data) {
          postErrorText.value = error.response.data.message
        }

        if (error.response.status === 400 && Array.isArray(error.response.data)) {
          postErrorText.value = null
          const errors: {
            email: string[]
            password: string[]
          } = {
            email: [],
            password: []
          }
          error.response.data.forEach((element: IErrorValidateFromServer) => {
            if (element.path === 'email' || element.path === 'password')
              errors[element.path].push(element.msg)
          })
          Object.assign(serverValidateErrors, errors)
        }
      }

      console.log('Ошибка сервера: ', error.response)

      return {
        success: false
      }
    })
}

import { apiManager } from '@/utils/API/index'
import type { AxiosError } from 'axios'
import { ref } from 'vue'

export const postErrorText = ref<null | string>(null)

export const usePostAuthLogin = async (
  email: string,
  password: string
): Promise<{ success: boolean }> => {
  return await apiManager
    .postAuthLogin({ email, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token)
      postErrorText.value = null

      return {
        success: true
      }
    })
    .catch(
      (
        error: AxiosError<
          {
            message: string
          },
          any
        >
      ) => {
        console.log(error)
        postErrorText.value = error.response?.data.message || 'Ошибка подключения'
        return {
          success: false
        }
      }
    )
}

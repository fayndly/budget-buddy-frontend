import { apiManager } from '@/utils/API/index'
import type { AxiosError } from 'axios'
import { ref } from 'vue'

export const postErrorText = ref<null | string>(null)

export const usePostAuthSignup = async (
  userName: string,
  email: string,
  password: string
): Promise<{ success: boolean }> => {
  return await apiManager
    .postAuthSignup({ userName, email, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token)
      console.log(response)

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
        // if (error. )
        console.log(error)
        postErrorText.value = error.response?.data.message || 'Ошибка подключения'
        return {
          success: false
        }
      }
    )
}

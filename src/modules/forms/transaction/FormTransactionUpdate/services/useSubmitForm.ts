import { apiManager } from '@/utils/API/index'
import type { AxiosError } from 'axios'
import { ref, reactive } from 'vue'

import type { TErrorServer } from '@/utils/types/errors'
import type { TTypeTransaction, TMongoObjectId } from '@/utils/types/data/data.types'

import { getFormatValidateErrorsServer } from '@/utils/validations/validationFormat'

export const isLoading = ref<boolean>(false)

export const postErrorText = ref<null | string>(null)
export const serverValidateErrors = reactive({})

export const usePatchTransactionUpdate = async (
  id: TMongoObjectId,
  type: TTypeTransaction,
  name: string,
  currency: TMongoObjectId,
  amount: number,
  check: TMongoObjectId,
  category: TMongoObjectId,
  time: string,
  description?: string | null
): Promise<void> => {
  isLoading.value = true
  postErrorText.value = null
  const params = { type, name, currency, amount, check, category, time, description }

  await apiManager
    .patchTransactionUpdate(params, id)
    .then((response) => {
      postErrorText.value = null

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
      isLoading.value = false
    })
}

import { ref } from 'vue'
import { checkApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICheck, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/API/types/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

export const check = ref<ICheck | null>(null)
export const isCheckNotFound = ref<boolean>(false)
export const isDataLoading = ref<boolean>(false)

export const useGetOneCheck = async (id: TMongoObjectId) => {
  isCheckNotFound.value = false
  isDataLoading.value = true
  try {
    const { data } = await checkApi.getOne(id, { currency: true })
    check.value = clearData<IDataCheck, ICheck>(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)

      if (
        response.status === 404 ||
        (typeof response.data.error === 'object' && response.data.error.name === 'CastError')
      )
        isCheckNotFound.value = true

      check.value = null
    } else {
      console.log(error)
    }
  } finally {
    isDataLoading.value = false
  }
}

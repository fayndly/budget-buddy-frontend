import { ref } from 'vue'
import { categoryApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/API/types/data.types'

import { isAxiosError } from 'axios'
import type { IErrorData } from '@/utils/API/types/error.types'

export const category = ref<ICategory | null>(null)
export const isCategoryNotFound = ref<boolean>(false)

export const useGetOneCategory = async (id: TMongoObjectId) => {
  isCategoryNotFound.value = false

  try {
    const { data } = await categoryApi.getOne(id)
    category.value = clearData<IDataCategory, ICategory>(data)
  } catch (error) {
    if (isAxiosError<IErrorData>(error) && error.response) {
      const response = error.response
      console.log(response)

      if (
        response.status === 404 ||
        (typeof response.data.error === 'object' && response.data.error.name === 'CastError')
      )
        isCategoryNotFound.value = true

      category.value = null
    } else {
      console.log(error)
    }
  }
}

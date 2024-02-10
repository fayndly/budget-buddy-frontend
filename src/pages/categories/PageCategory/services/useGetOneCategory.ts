import { ref } from 'vue'
import { categoryApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

export const category = ref<ICategory | null>(null)
export const isCategoryNotFound = ref<boolean>(false)

export const useGetOneCategory = async (id: TMongoObjectId) => {
  isCategoryNotFound.value = false
  return await categoryApi
    .getOne(id)
    .then((response) => {
      isCategoryNotFound.value = false
      category.value = clearData<IDataCategory, ICategory>(response.data)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 404) isCategoryNotFound.value = true
      category.value = null
    })
}

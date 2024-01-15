import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

export const category = ref<ICategory | null>(null)
export const isCategoryNotFound = ref<boolean>(false)

export const useGetOneCategory = async (id: TTypeTransaction) => {
  isCategoryNotFound.value = false
  return await apiManager
    .getCategory(id)
    .then((response) => {
      category.value = clearData<IDataCategory, ICategory>(response.data)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 404) isCategoryNotFound.value = true
      category.value = null
    })
}

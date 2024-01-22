import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

export const categories = ref<ICategory[]>([])

export const useGetCategories = async (type?: TTypeTransaction | null) => {
  const params: { type?: TTypeTransaction } = {}
  if (type) params.type = type
  return await apiManager
    .getCategories(params)
    .then((response) => {
      categories.value = clearData<IDataCategory[], ICategory[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      categories.value = []
    })
}

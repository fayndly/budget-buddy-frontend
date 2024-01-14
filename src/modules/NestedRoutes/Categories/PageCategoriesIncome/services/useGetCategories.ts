import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

export const categories = ref<ICategory[]>([])

export const useGetCategories = async () => {
  return await apiManager
    .getCategories({ type: 'income' })
    .then((response) => {
      categories.value = clearData<IDataCategory[], ICategory[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      categories.value = []
    })
}

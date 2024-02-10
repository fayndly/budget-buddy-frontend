import { ref } from 'vue'
import { categoryApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

export const categories = ref<ICategory[]>([])
export const isLoading = ref<boolean>(false)

export const useGetCategories = async () => {
  isLoading.value = true

  return await categoryApi
    .getAll({ type: 'income' })
    .then((response) => {
      categories.value = clearData<IDataCategory[], ICategory[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      categories.value = []
    })
    .finally(() => {
      isLoading.value = false
    })
}

import { ref } from 'vue'
import { categoryApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/API/types/data.types'

export const categories = ref<ICategory[]>([])
export const isLoading = ref<boolean>(false)

export const useGetCategories = async () => {
  isLoading.value = true

  try {
    const { data } = await categoryApi.getAll({ type: 'income' })
    categories.value = clearData<IDataCategory[], ICategory[]>(data)
  } catch (error) {
    categories.value = []
  } finally {
    isLoading.value = false
  }
}

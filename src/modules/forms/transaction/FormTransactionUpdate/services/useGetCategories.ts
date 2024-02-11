import { ref } from 'vue'
import { categoryApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/API/types/data.types'

export const categories = ref<ICategory[]>([])

export const useGetCategories = async (type?: TTypeTransaction | null) => {
  const params: { type?: TTypeTransaction } = {}
  if (type) params.type = type

  try {
    const { data } = await categoryApi.getAll(params)
    categories.value = clearData<IDataCategory[], ICategory[]>(data)
  } catch (error) {
    categories.value = []
    console.log(error)
  }
}

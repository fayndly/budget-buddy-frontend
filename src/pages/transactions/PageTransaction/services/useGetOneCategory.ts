import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICategory, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataCategory } from '@/utils/types/data/serverData.types'

export const category = ref<ICategory | null>(null)

export const useGetOneCategory = async (id: TTypeTransaction) => {
  return await apiManager
    .getCategory(id)
    .then((response) => {
      category.value = clearData<IDataCategory, ICategory>(response.data)
    })
    .catch((err) => {
      console.log(err)
      category.value = null
    })
}

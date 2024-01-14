import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICheck, TTypeTransaction } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/types/data/serverData.types'

export const check = ref<ICheck | null>(null)
export const isCheckNotFound = ref<boolean>(false)

export const useGetOneCheck = async (id: TTypeTransaction) => {
  isCheckNotFound.value = false
  return await apiManager
    .getCheck(id)
    .then((response) => {
      check.value = clearData<IDataCheck, ICheck>(response.data)
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status === 403) isCheckNotFound.value = true
      check.value = null
    })
}

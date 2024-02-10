import { ref } from 'vue'
import { checkApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICheck } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/types/data/serverData.types'

export const checks = ref<ICheck[]>([])
export const isLoading = ref<boolean>(false)

export const useGetChecks = async () => {
  isLoading.value = true

  return await checkApi
    .getAll()
    .then((response) => {
      checks.value = clearData<IDataCheck[], ICheck[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      checks.value = []
    })
    .finally(() => {
      isLoading.value = false
    })
}

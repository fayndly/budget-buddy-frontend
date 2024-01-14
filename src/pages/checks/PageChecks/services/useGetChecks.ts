import { ref } from 'vue'
import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICheck } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/types/data/serverData.types'

export const checks = ref<ICheck[]>([])

export const useGetChecks = async () => {
  return await apiManager
    .getChecks()
    .then((response) => {
      checks.value = clearData<IDataCheck[], ICheck[]>(response.data)
    })
    .catch((err) => {
      console.log(err)
      checks.value = []
    })
}

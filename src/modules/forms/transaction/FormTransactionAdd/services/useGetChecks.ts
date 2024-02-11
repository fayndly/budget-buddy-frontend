import { ref } from 'vue'
import { checkApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICheck } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/API/types/data.types'

export const checks = ref<ICheck[]>([])

export const useGetChecks = async () => {
  try {
    const { data } = await checkApi.getAll()
    checks.value = clearData<IDataCheck[], ICheck[]>(data)
  } catch (error) {
    checks.value = []
    console.log(error)
  }
}

import { ref } from 'vue'
import { checkApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import type { ICheck } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/API/types/data.types'

export const checks = ref<ICheck[]>([])
export const isLoading = ref<boolean>(false)

export const useGetChecks = async () => {
  isLoading.value = true

  try {
    const { data } = await checkApi.getAll({ currency: true })
    checks.value = clearData<IDataCheck[], ICheck[]>(data)
  } catch (error) {
    checks.value = []
  } finally {
    isLoading.value = false
  }
}

import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ICheck, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/API/types/data.types'

import { checkApi } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

export const useChecksStore = defineStore('checksApi', () => {
  const checks = ref<ICheck[]>([])
  const isLoading = ref<boolean>(false)

  const getChecks = computed(() => checks.value)

  const getCheckById = async (id: TMongoObjectId) => {
    const check = checks.value.find((val) => val.id === id)

    if (!check) {
      try {
        const { data } = await checkApi.getOne(id, { currency: true })

        await uploadChecks()

        return clearData<IDataCheck, ICheck>(data)
      } catch (error) {
        console.log(error)

        return
      }
    }

    return check
  }

  const uploadChecks = async () => {
    console.log('uploadChecks')

    isLoading.value = true
    try {
      const { data } = await checkApi.getAll({ currency: true })

      const formatChecks = clearData<IDataCheck[], ICheck[]>(data)

      checks.value = formatChecks
    } catch (err) {
      checks.value = []
      console.log(err)
    } finally {
      isLoading.value = false
    }
  }

  const $reset = () => {
    checks.value = []
    isLoading.value = false
  }

  return { checks, uploadChecks, getCheckById, getChecks, isLoading, $reset }
})

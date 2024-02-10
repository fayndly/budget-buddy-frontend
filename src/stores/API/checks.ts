import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import type { ICheck, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IDataCheck } from '@/utils/types/data/serverData.types'

// import { apiManager } from '@/utils/API'
import { clearData } from '@/utils/API/helpers/clearData'

import { useCurrencyStore } from '@/stores/API/currencies'

export const useChecksStore = defineStore('checksApi', () => {
  const currencyStore = useCurrencyStore()

  const checks = ref<ICheck[]>([])

  const getChecks = computed(() => checks.value)

  const getCheckById = (id: TMongoObjectId, options?: { hasCurrency: boolean }) => {
    const check = checks.value.find((val) => val.id === id)

    if (check) {
      if (options) {
        if (options.hasCurrency) {
          if (typeof check.currency === 'string') {
            const currency = currencyStore.getCurrencyById(check.currency)
            if (currency) check.currency = currency
          }
        }
      }
    }

    return check
  }

  const uploadChecks = async (options?: { hasCurrency: boolean }) => {
    try {
      // const { data } = await apiManager.getChecks()
      const data = []

      const formatChecks = clearData<IDataCheck[], ICheck[]>(data)

      if (options) {
        if (options.hasCurrency) {
          formatChecks.forEach((val: ICheck) => {
            if (typeof val.currency === 'string') {
              val.currency = currencyStore.getCurrencyById(val.currency) || val.currency
            }
          })
        }
      }

      checks.value = formatChecks
    } catch (err) {
      checks.value = []
      console.log(err)
    }
  }
  // await apiManager
  //   .getChecks()
  //   .then((response) => {
  //     const formatChecks = clearData<IDataCheck[], ICheck[]>(response.data)

  //     if (options) {
  //       if (options.hasCurrency) {
  //         formatChecks.forEach(async (val: ICheck) => {
  //           if (typeof val.currency === 'string') {
  //             const currency = await currencyStore.getCurrencyById(val.currency)
  //             if (currency) val.currency = currency
  //           }
  //         })
  //       }
  //     }

  //     checks.value = formatChecks

  //     console.log('uploadChecks')
  //   })
  //   .catch((err) => {
  //     checks.value = []
  //     console.log(err)
  //   })

  return { checks, uploadChecks, getCheckById, getChecks }
})

import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ICheck } from '@/utils/types/data/data.types'

import { useChecksStore } from '@/stores/API/checks'

function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

export const useBarCheckStore = defineStore('BarCheck', () => {
  const checksStore = useChecksStore()

  const chosedCheck = ref<ICheck | null>(null)
  const checks = ref<ICheck[]>([])

  const errors = ref<string[]>([])

  const setCheck = (check: ICheck) => {
    chosedCheck.value = check
  }

  const setDefaultCheck = () => {
    if (!chosedCheck.value) {
      checks.value[0] && setCheck(checks.value[0])
    } else if (checks.value[0].id === chosedCheck.value.id) {
      !deepEqual(checks.value[0], chosedCheck.value) && checks.value[0] && setCheck(checks.value[0])
    }
  }

  checksStore.$subscribe(
    (_, state) => {
      console.log('update')

      checks.value.length = 0
      checks.value.push(...state.checks)
      setDefaultCheck()
    },
    { detached: true }
  )

  const uploadChecks = () => {
    if (!checks.value.length) {
      checks.value.length = 0
      checks.value.push(...checksStore.checks)
    }

    setDefaultCheck()
  }

  return { chosedCheck, checks, errors, setCheck, uploadChecks, setDefaultCheck }
})

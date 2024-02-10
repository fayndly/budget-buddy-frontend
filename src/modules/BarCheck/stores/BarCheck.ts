import { defineStore } from 'pinia'
import { ref } from 'vue'

import type { ICheck } from '@/utils/types/data/data.types'

import { useChecksStore } from '@/stores/API/checks'

export const useBarCheckStore = defineStore('BarCheck', () => {
  const checksStore = useChecksStore()

  const chosedCheck = ref<ICheck | null>(null)
  const checks = ref<ICheck[]>([])

  const errors = ref<string[]>([])

  const setCheck = (check: ICheck) => {
    chosedCheck.value = check
  }

  const setDefaultCheck = () => {
    !chosedCheck.value && checks.value[0] && setCheck(checks.value[0])
  }

  checksStore.$subscribe(
    (mutation, state) => {
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

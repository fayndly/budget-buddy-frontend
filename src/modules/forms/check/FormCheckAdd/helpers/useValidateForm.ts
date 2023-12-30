import { computed } from 'vue'

import { rulesInputName } from '@/components/inputs/text/InputName'
import { rulesInputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import { rulesInputCount } from '@/components/inputs/text/InputCount'

export const rules = computed(() => {
  return {
    name: rulesInputName,
    count: rulesInputCount,
    currency: rulesInputSelectCurrency
  }
})

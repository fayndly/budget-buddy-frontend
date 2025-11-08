import { computed } from 'vue'

import { rulesInputName } from '@/components/inputs/text/InputName'
import { rulesInputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import { rulesInputAmount } from '@/components/inputs/text/InputAmount'

export const rules = computed(() => {
  return {
    name: rulesInputName,
    amount: rulesInputAmount,
    currency: rulesInputSelectCurrency
  }
})

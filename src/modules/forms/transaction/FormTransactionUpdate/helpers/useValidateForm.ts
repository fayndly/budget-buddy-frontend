import { computed } from 'vue'

import { rulesInputName } from '@/components/inputs/text/InputName'
import { rulesInputSelectType } from '@/components/inputs/select/InputSelectType'
import { rulesInputSelectCurrency } from '@/components/inputs/select/InputSelectCurrency'
import { rulesInputAmount } from '@/components/inputs/text/InputAmount'
import { rulesInputSelectCheck } from '@/components/inputs/select/InputSelectCheck'
import { rulesInputChoseCategory } from '@/modules/inputs/InputChoseCategory'
import { rulesInputChoseDate } from '@/modules/inputs/InputChoseDate'
import { rulesInputDescription } from '@/components/inputs/text/InputDescription'

export const rules = computed(() => {
  return {
    name: rulesInputName,
    type: rulesInputSelectType,
    currency: rulesInputSelectCurrency,
    amount: rulesInputAmount,
    check: rulesInputSelectCheck,
    category: rulesInputChoseCategory,
    time: rulesInputChoseDate,
    description: rulesInputDescription
  }
})

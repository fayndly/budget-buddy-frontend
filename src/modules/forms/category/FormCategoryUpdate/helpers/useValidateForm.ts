import { computed } from 'vue'

import { rulesInputName } from '@/components/inputs/text/InputName'
import { rulesInputSelectType } from '@/components/inputs/select/InputSelectType'
import { rulesInputChoseColor } from '@/modules/inputs/InputChoseColor'
import { rulesInputChoseIcon } from '@/modules/inputs/InputChoseIcon'

export const rules = computed(() => {
  return {
    name: rulesInputName,
    type: rulesInputSelectType,
    color: rulesInputChoseColor,
    icon: rulesInputChoseIcon
  }
})

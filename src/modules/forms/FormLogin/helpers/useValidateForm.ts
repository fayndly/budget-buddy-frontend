import { computed } from 'vue'

import { rulesInputPassword } from '@/components/inputs/text/InputPassword'
import { rulesInputEmail } from '@/components/inputs/text/InputEmail'

export const rules = computed(() => {
  return {
    email: rulesInputEmail,
    password: rulesInputPassword
  }
})

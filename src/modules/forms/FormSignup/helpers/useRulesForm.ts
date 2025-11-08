import { computed } from 'vue'

import { rulesInputPassword } from '@/components/inputs/text/InputPassword'
import { rulesInputEmail } from '@/components/inputs/text/InputEmail'
import { rulesInputUserName } from '@/components/inputs/text/InputUserName'

export const rules = computed(() => {
  return {
    userName: rulesInputUserName,
    email: rulesInputEmail,
    password: rulesInputPassword
  }
})

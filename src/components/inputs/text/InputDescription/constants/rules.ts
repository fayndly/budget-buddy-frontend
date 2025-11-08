import { helpers, maxLength } from '@vuelidate/validators'

export const rulesInputDescription = {
  maxLength: helpers.withMessage('Максимальная длина - 256 символа', maxLength(256))
}

import { helpers, minLength, maxLength } from '@vuelidate/validators'

export const rulesInputDescription = {
  minLength: helpers.withMessage('Минимальная длина - 1 символ', minLength(1)),
  maxLength: helpers.withMessage('Максимальная длина - 256 символа', maxLength(256))
}

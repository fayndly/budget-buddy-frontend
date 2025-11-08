import { helpers, required, minLength, maxLength } from '@vuelidate/validators'

export const rulesInputName = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  minLength: helpers.withMessage('Минимальная длина - 1 символ', minLength(1)),
  maxLength: helpers.withMessage('Максимальная длина - 32 символа', maxLength(32))
}

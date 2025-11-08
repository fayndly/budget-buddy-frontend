import { helpers, required, minLength, maxLength } from '@vuelidate/validators'

export const rulesInputUserName = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  minLength: helpers.withMessage('Минимальная длина - 2 символа', minLength(2)),
  maxLength: helpers.withMessage('Максимальная длина - 24 символа', maxLength(24))
}

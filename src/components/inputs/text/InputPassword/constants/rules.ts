import { helpers, required, minLength, maxLength } from '@vuelidate/validators'

export const rulesInputPassword = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  minLength: helpers.withMessage('Минимальная длина - 6 символов', minLength(6)),
  maxLength: helpers.withMessage('Максимальная длина - 128 символов', maxLength(128))
}

import { helpers, required, email } from '@vuelidate/validators'

export const rulesInputEmail = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  email: helpers.withMessage('Не валидный email', email)
}

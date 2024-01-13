import { helpers, required } from '@vuelidate/validators'

export const rulesInputSelectCheck = {
  required: helpers.withMessage('Поле должно быть заполнено', required)
}

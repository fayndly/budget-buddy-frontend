import { helpers, required } from '@vuelidate/validators'

export const rulesInputSelectCurrency = {
  required: helpers.withMessage('Поле должно быть заполнено', required)
}

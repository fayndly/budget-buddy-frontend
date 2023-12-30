import { helpers, required } from '@vuelidate/validators'

export const rulesInputName = {
  required: helpers.withMessage('Поле должно быть заполнено', required)
}

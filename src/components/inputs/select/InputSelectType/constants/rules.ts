import { helpers, required } from '@vuelidate/validators'

export const rulesInputSelectType = {
  required: helpers.withMessage('Поле должно быть заполнено', required)
}

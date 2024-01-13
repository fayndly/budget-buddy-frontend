import { helpers, required } from '@vuelidate/validators'

export const rulesInputChoseDate = {
  required: helpers.withMessage('Выберите дату', required)
}

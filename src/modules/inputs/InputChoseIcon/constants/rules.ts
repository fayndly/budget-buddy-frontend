import { helpers, required } from '@vuelidate/validators'

export const rulesInputChoseIcon = {
  required: helpers.withMessage('Выберите иконку', required)
}

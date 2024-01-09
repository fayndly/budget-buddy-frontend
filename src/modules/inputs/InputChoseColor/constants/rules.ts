import { helpers, required } from '@vuelidate/validators'

export const rulesInputChoseColor = {
  required: helpers.withMessage('Выберите цвет', required)
}

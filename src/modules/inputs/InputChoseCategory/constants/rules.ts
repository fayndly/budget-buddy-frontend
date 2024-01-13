import { helpers, required } from '@vuelidate/validators'

export const rulesInputChoseCategory = {
  required: helpers.withMessage('Выберите цвет', required)
}

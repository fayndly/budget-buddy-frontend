import { helpers, required } from '@vuelidate/validators'

export const rulesInputChoseDate = {
  required: helpers.withMessage('Выберите дату', required),
  isValidDate: helpers.withMessage('Неверный формат', (value: Date): boolean => {
    return value instanceof Date
  })
}

import { helpers, required } from '@vuelidate/validators'

export const rulesInputSelectType = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  isValidValue: helpers.withMessage('Неверное значение', (value: string): boolean => {
    return value === 'expense' || value === 'income'
  })
}

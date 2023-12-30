import { helpers, required, decimal, minValue } from '@vuelidate/validators'

export const rulesInputCount = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  decimal: helpers.withMessage('Поле должно быть десятичным числом', decimal),
  minValueValue: helpers.withMessage('Поле должно быть не меньше 0', minValue(0))
}

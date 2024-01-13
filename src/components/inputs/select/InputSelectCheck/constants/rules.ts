import { helpers, required } from '@vuelidate/validators'
import { isValidId } from '@/utils/helpers/isValidId'

export const rulesInputSelectCheck = {
  required: helpers.withMessage('Поле должно быть заполнено', required),
  isValidId: helpers.withMessage('Неверный формат', isValidId)
}

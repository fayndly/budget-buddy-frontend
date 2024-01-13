import { helpers, required } from '@vuelidate/validators'
import { isValidId } from '@/utils/helpers/isValidId'

export const rulesInputChoseCategory = {
  required: helpers.withMessage('Выберите категорию', required),
  isValidId: helpers.withMessage('Неверный формат', isValidId)
}

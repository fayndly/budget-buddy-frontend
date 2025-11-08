import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { IFormFields } from '../types/formFields.types'

export const useQueryHandler = (route: RouteLocationNormalizedLoaded, formData: IFormFields) => {
  if (route.query) {
    const {
      type,
      check
    }: {
      type?: string | undefined
      check?: string | undefined
    } = route.query
    if (type && (type === 'expense' || type === 'income')) {
      formData.type = type
    } else {
      formData.type = 'expense'
    }
    if (check) {
      formData.check = check
    }
  }
}

import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useQueryHandler = (route: RouteLocationNormalizedLoaded, formData: any) => {
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

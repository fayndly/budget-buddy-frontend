import type { RouteLocationNormalizedLoaded } from 'vue-router'

export const useQueryHandler = (route: RouteLocationNormalizedLoaded, typeField: any) => {
  if (route.query) {
    const {
      type
    }: {
      type?: string | undefined
    } = route.query
    if (type && (type === 'expense' || type === 'income')) {
      typeField.type = type
    } else {
      typeField.type = 'expense'
    }
  }
}

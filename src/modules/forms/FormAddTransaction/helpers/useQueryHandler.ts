import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Ref } from 'vue'

export const useQueryHandler = (
  route: RouteLocationNormalizedLoaded,
  typeField: Ref<any>,
  checkField: Ref<any>
) => {
  if (route.query) {
    const {
      type,
      check
    }: {
      type?: string | undefined
      check?: string | undefined
    } = route.query
    if (type && (type === 'expense' || type === 'income')) {
      typeField.value = type || 'expense'
    }
    if (check) {
      checkField.value = check
    }
  }
}

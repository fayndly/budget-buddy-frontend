import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Ref } from 'vue'

export const useQueryHandler = (route: RouteLocationNormalizedLoaded, typeField: Ref<any>) => {
  if (route.query) {
    const {
      type
    }: {
      type?: string | undefined
    } = route.query
    if (type && (type === 'expense' || type === 'income')) {
      typeField.value = type
    } else {
      typeField.value = 'expense'
    }
  }
}

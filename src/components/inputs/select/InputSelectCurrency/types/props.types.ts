import type { ICurrency } from '@/utils/types/data/data.types'

export interface IPropsInputSelectCurrency {
  modelValue: string | null
  values: ICurrency[]
  errors: string[]
  hasError: boolean
}

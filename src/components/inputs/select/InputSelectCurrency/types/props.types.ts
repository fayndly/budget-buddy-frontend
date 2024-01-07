import type { ICurrency } from '@/utils/types/data/data.types'

export interface IPropsInputSelectCurrency {
  selectedValue: string | null
  values: ICurrency[]
  errors: string[]
  hasError: boolean
}

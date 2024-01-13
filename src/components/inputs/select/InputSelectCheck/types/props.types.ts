import type { ICheck } from '@/utils/types/interfaces'

export interface IPropsInputSelectCheck {
  modelValue: string | null
  values: ICheck[]
  errors: string[]
  hasError: boolean
}

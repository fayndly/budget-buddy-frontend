import type { ICategory } from '@/utils/types/data/data.types'

export interface IPropsInputChoseCategory {
  values: ICategory[]
  modelValue: string | null
  defaultCategory?: string
}

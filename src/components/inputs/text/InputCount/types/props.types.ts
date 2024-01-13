import type { IPropsInput } from '@/utils/types/inputs/props.types'

export interface IPropsInputCount extends IPropsInput<number> {
  prefixText?: string
  suffixText?: string
  label?: string
}

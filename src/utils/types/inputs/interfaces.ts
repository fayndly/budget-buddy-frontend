import type { TTypeInput } from '@/utils/types/inputs/types'

export interface IInputFilledText {
  type?: TTypeInput
  label?: string
  value?: string
  placeholder?: string
}

export interface IInputPassword {
  label?: string
  value?: string
  placeholder?: string
}

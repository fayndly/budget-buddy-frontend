import type { TTypeInput } from '@/utils/types/inputs/types'

interface IInputFilledText {
  type?: TTypeInput
  label?: string
  value?: string
  placeholder?: string
}

interface IInputPassword {
  label?: string
  value?: string
  placeholder?: string
}

export type { IInputFilledText, IInputPassword }

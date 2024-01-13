import type { IColor } from '@/modules/inputs/InputChoseColor'

export interface IPropsRadioColor {
  name: string
  id: string
  value: string
  checked: boolean
  modelValue: IColor | null
}

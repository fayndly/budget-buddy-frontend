import type { IColor } from '@/modules/inputs/InputChoseColor'

export interface IRadioColor {
  name: string
  id: string
  value: string
  checked: boolean
  modelValue: IColor | null
}

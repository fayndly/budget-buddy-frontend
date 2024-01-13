import type { IDate } from '@/utils/types/interfaces'
import type { IPropsRadio } from '@/utils/types/props/inputs'

export interface IPropsRadioDate {
  name: string
  id: string
  value: string
  checked: boolean
  modelValue: IDate | null
  date: Date
  header: string
}

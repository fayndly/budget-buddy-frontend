import type { IDate } from '@/utils/types/interfaces'
import type { IPropsRadio } from '@/utils/types/props/inputs'

export interface IPropsRadioCategory extends IPropsRadio<IDate | undefined> {
  date: Date
  header: string
}

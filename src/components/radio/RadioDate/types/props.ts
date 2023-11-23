import type { IDate } from '@/utils/types/interfaces'
import type { IPropsRadio } from '@/utils/types/props/inputs'

export interface IPropsRadioDate extends IPropsRadio<IDate | undefined> {
  date: Date
  header: string
}

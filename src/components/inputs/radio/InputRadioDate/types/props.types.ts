import type { IDate } from '@/utils/types/data/data.types'
import type { IPropsInputRadio } from '@/utils/types/inputs/props.types'

export interface IPropsRadioDate extends IPropsInputRadio<IDate> {
  date: Date
  header: string
}

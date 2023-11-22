import type { IDate } from '@/utils/types/interfaces'

export interface IPropsRadioCategory {
  name: string
  id: string
  value: IDate
  date: Date
  header: string
  checkedValue: IDate | undefined
}

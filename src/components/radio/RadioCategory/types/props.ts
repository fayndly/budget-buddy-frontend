import type { ICategory } from '@/utils/types/interfaces'
import type { IPropsRadio } from '@/utils/types/props/inputs'

export interface IPropsRadioCategory extends IPropsRadio<ICategory | undefined> {
  icon?: string
  color: string
  shortDesc: string
}

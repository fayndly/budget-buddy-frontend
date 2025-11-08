import type { IPropsInputRadio } from '@/utils/types/inputs/props.types'
import type { TMongoObjectId } from '@/utils/types/data/data.types'

export interface IPropsRadioCategory extends IPropsInputRadio<TMongoObjectId> {
  icon?: string | null
  color: string
  nameCategory: string
}

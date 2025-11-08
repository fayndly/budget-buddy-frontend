import type { ICategory, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IPropsChose } from '@/utils/types/inputs/props.types'

export interface IPropsInputChoseCategory extends IPropsChose<TMongoObjectId> {
  values: ICategory[]
}

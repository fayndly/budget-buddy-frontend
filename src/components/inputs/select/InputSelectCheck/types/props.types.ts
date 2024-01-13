import type { ICheck, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IPropsInputSelect } from '@/utils/types/inputs/props.types'

export interface IPropsInputSelectCheck extends IPropsInputSelect<TMongoObjectId, ICheck> {}

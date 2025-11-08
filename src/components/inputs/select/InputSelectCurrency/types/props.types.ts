import type { ICurrency, TMongoObjectId } from '@/utils/types/data/data.types'
import type { IPropsInputSelect } from '@/utils/types/inputs/props.types'

export interface IPropsInputSelectCurrency extends IPropsInputSelect<TMongoObjectId, ICurrency> {}

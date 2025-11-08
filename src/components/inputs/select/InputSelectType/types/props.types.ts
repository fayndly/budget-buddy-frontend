import type { IPropsInputSelect } from '@/utils/types/inputs/props.types'
import type { TTypeTransaction } from '@/utils/types/data/data.types'

export interface IPropsInputSelectType
  extends Omit<IPropsInputSelect<TTypeTransaction, TTypeTransaction>, 'values'> {}

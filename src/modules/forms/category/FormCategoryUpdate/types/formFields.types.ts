import type { TTypeTransaction } from '@/utils/types/data/data.types'
import type { IColor } from '@/utils/types/data/data.types'
import type { IIcon } from '@/utils/types/data/data.types'

export interface IFormFields {
  name: string
  type: TTypeTransaction | null
  color: IColor | null
  icon: IIcon | null
}

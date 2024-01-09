import type { TTypeTransaction } from '@/utils/types/data/data.types'
import type { IColor } from '@/modules/inputs/InputChoseColor'
import type { IIcon } from '@/modules/inputs/InputChoseIcon'

export interface IFormFields {
  name: string
  type: TTypeTransaction | null
  color: IColor | null
  icon: IIcon | null
}

import type { IPropsInputRadio } from '@/utils/types/inputs/props.types'
import type { IIcon } from '@/utils/types/data/data.types'

export interface IRadioIcon extends IPropsInputRadio<IIcon> {
  hasText?: boolean
  iconName: string
}

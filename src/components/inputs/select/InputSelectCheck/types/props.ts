import type { ICheck } from '@/utils/types/interfaces'
import type { IPropsSelect } from '@/utils/types/props/inputs'

export interface IPropsInputSelectCheck extends IPropsSelect<string | null> {
  checks: ICheck[]
}

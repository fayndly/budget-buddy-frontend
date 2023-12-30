import type { ICurrency } from '@/utils/types/interfaces'
// import type { IPropsSelect } from '@/utils/types/props/inputs'

// export interface IPropsInputSelectCurrency extends IPropsSelect<ICurrency | null> {
//   currencies: ICurrency[]
// }
export interface IPropsInputSelectCurrency {
  selectedValue: string | null
  values: ICurrency[]
  errors: string[]
  hasError: boolean
}

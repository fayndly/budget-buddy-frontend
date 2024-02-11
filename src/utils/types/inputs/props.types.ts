interface IPropsWithErrors {
  hasError: boolean
  errors: string[]
}

export interface IPropsInput<T> extends IPropsWithErrors {
  modelValue: T
}

export interface IPropsInputSelect<T, D> extends IPropsWithErrors {
  modelValue: T | null
  values: D[]
}

export interface IPropsInputRadio<T> {
  name: string
  id: string
  value: string | null
  checked: boolean
  modelValue: T | null
}

export interface IPropsChose<T> {
  modelValue: T | null
  defaultValue?: string | null
}

export interface IPropsInput<T> {
  value: T
  id: string
  name: string
}

export interface IPropsRadio<T> extends IPropsInput<T> {
  checkedValue: T
}

export interface IPropsSelect<T> {
  selectedValue: T
}

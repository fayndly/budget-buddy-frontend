export interface IErrorData {
  message: string
  error?:
    | string
    | {
        kind: string
        message: string
        name: string
        path: string
        reason: any
        stringValue: string
        value: string
        valueType: string
      }
}

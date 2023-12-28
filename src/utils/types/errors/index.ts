export interface IErrorValidateFromServer {
  location: string
  msg: string
  path: string
  type: string
  value: string
}

export type TErrorsFormat = { [key: string]: string[] }

export type TErrorServer = IErrorValidateFromServer[] | { message: string }

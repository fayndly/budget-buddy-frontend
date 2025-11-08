import type { IErrorValidateFromServer, TErrorsFormat } from '@/utils/types/errors'

export const getFormatValidateErrorsServer = (
  errors: IErrorValidateFromServer[]
): TErrorsFormat => {
  return errors.reduce((acc: TErrorsFormat, val: IErrorValidateFromServer) => {
    if (!acc[val.path]) acc[val.path] = []
    acc[val.path].push(val.msg)
    return acc
  }, {})
}

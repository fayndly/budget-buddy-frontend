type mongoObjectId = string

interface IServerResponse {
  _id: mongoObjectId
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IResponsePostAuthLogin {
  success: boolean
  token: string
}

export interface IResponsePostAuthSignup {
  success: boolean
  token: string
}

export interface IResponseGetCheck extends IServerResponse {
  transactions: {
    expense: mongoObjectId[]
    income: mongoObjectId[]
  }
  user: mongoObjectId
  name: string
  amount: number
  currency: null | mongoObjectId
}

export type IResponseGetChecks = IResponseGetCheck[]

export interface IResponsePostCheckAdd {
  success: boolean
}

export interface IResponsePatchCheckUpdate {
  success: boolean
}

// IResponseGetCheck
// IResponseGetChecks
// IResponsePostCheckAdd
// IResponsePatchCheckUpdate

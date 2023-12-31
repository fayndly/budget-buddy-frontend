export interface IArgumentsPostAuthLogin {
  email: string
  password: string
}

export interface IArgumentsPostAuthSignup {
  userName: string
  email: string
  password: string
}

export interface IArgumentsGetCheck {
  id: string
}

export interface IArgumentsPostChecksAdd {
  name: string
  amount: number
  currency: string | null
}

export interface IArgumentsPatchChecksUpdate extends IArgumentsPostChecksAdd {}

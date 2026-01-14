export interface IUser {
  id: number
  firstName: string
  lastName: string
  email: string
  avatar: string
  googleId: string
}

export interface IRegisterParams {
  email: string
  password: string
}

export interface ILoginParams extends IRegisterParams {
}

export interface ILoginResponse {
  message: string
  user: IUser
  token: string
}

export interface IRegisterResponse extends ILoginResponse {
}

export interface ILogoutResponse {
  message: string
  success: boolean
}
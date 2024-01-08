export type TAuthResponse = {
  refreshToken: string
  accessToken: string
  user: TUser
}

export type TUser = {
  id: string
  name: string
}

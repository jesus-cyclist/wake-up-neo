import axios, { AxiosResponse } from 'axios'
import $api from '../http/index'
import type { TAuthResponse } from 'models/AuthResponse'
import { API_URL, LOGIN_PATH, REGISTRATION_PATH } from 'constants/paths'

export default class AuthService {
  static async login(
    name: string,
    password: string
  ): Promise<AxiosResponse<TAuthResponse>> {
    return $api.post<TAuthResponse>(LOGIN_PATH, { name, password })
  }

  static logout(): Promise<void> {
    return $api.post('/logout')
  }

  static async registration(
    name: string,
    password: string
  ): Promise<AxiosResponse<TAuthResponse>> {
    return $api.post<TAuthResponse>(REGISTRATION_PATH, { name, password })
  }

  static async checkAuth(): Promise<AxiosResponse<TAuthResponse>> {
    return axios.get<TAuthResponse>(`${API_URL}/refresh`, {
      withCredentials: true,
    })
  }
}

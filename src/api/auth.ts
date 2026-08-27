import { apiRequest } from './client'
import type { AuthResponse, AuthUser } from '../types'

const TOKEN_KEY = 'amana_admin_token'

export function getStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function storeToken(token: string): void {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY)
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiRequest<AuthResponse>('/auth', {
    method: 'POST',
    body: { email, password },
  })

  storeToken(response.token)
  return response
}

export async function fetchCurrentUser(token: string): Promise<AuthUser> {
  return apiRequest<AuthUser>('/auth_me', {
    method: 'GET',
    token,
  })
}

export function logout(): void {
  clearToken()
}

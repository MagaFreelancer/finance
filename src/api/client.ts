const API_BASE = import.meta.env.VITE_API_URL
export const API_BASE_LOCAL = API_BASE
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
  token?: string | null
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, token, headers, ...rest } = options

  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      Accept: 'application/json',
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let message = 'Произошла ошибка запроса'

    try {
      const data = (await response.json()) as { message?: string; error?: string }
      message = data.message || data.error || message
    } catch {
      // ignore parse errors
    }

    if (
      response.status === 401 ||
      message === 'RESOURCE_INVALID_LOGIN_OR_PASSWORD'
    ) {
      message = 'Неверный логин или пароль'
    }

    if (message === 'RESOURCE_NOT_FOUND') {
      message = 'Данные не найдены'
    }

    throw new ApiError(message, response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()
  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}

export { API_BASE }

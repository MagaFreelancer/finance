import { apiRequest } from './client'
import type { CreateCardPayload, ProductCard } from '../types'

export async function getCards(): Promise<ProductCard[]> {
  const cards = await apiRequest<ProductCard[]>('/cards', {
    method: 'GET',
  })

  return [...cards].sort((a, b) => b.id - a.id)
}

export async function createCard(
  payload: CreateCardPayload,
  token: string,
): Promise<ProductCard> {
  return apiRequest<ProductCard>('/cards', {
    method: 'POST',
    body: payload,
    token,
  })
}

export async function updateCard(
  id: number,
  payload: CreateCardPayload,
  token: string,
): Promise<ProductCard> {
  return apiRequest<ProductCard>(`/cards/${id}`, {
    method: 'PATCH',
    body: payload,
    token,
  })
}

export async function deleteCard(id: number, token: string): Promise<void> {
  await apiRequest<void>(`/cards/${id}`, {
    method: 'DELETE',
    token,
  })
}

import { apiRequest } from './client'
import type { CreateOrderPayload, Order } from '../types'

export async function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return apiRequest<Order>('/orders', {
    method: 'POST',
    body: payload,
  })
}

export async function getOrders(): Promise<Order[]> {
  const orders = await apiRequest<Order[]>('/orders', {
    method: 'GET',
  })

  return [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export async function markOrderAsRead(id: number): Promise<Order> {
  return apiRequest<Order>(`/orders/${id}`, {
    method: 'PATCH',
    body: { isRead: true },
  })
}

export async function deleteOrder(id: number): Promise<void> {
  await apiRequest<void>(`/orders/${id}`, {
    method: 'DELETE',
  })
}

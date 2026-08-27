import type { Order, OrderStats } from '../types'

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function calculateOrderStats(orders: Order[], now = new Date()): OrderStats {
  const todayStart = startOfDay(now)
  const weekStart = new Date(todayStart)
  weekStart.setDate(weekStart.getDate() - 6)
  const monthStart = startOfMonth(now)

  let today = 0
  let week = 0
  let month = 0

  for (const order of orders) {
    const created = new Date(order.createdAt)
    if (Number.isNaN(created.getTime())) continue

    if (created >= todayStart) today += 1
    if (created >= weekStart) week += 1
    if (created >= monthStart) month += 1
  }

  return {
    today,
    week,
    month,
    total: orders.length,
  }
}

import { apiRequest } from './client'
import { DEFAULT_PERCENT } from '../lib/calculator'
import type { ProcSettings } from '../types'

function normalizePercent(value: unknown): number | null {
  const num = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(num)) return null
  return Math.round(num * 100) / 100
}

export async function getPercent(): Promise<number> {
  const items = await apiRequest<ProcSettings[]>('/proc', {
    method: 'GET',
  })

  const percent = normalizePercent(items[0]?.percent)
  return percent ?? DEFAULT_PERCENT
}

export async function savePercent(
  percent: number,
  token: string,
): Promise<ProcSettings> {
  const items = await apiRequest<ProcSettings[]>('/proc', {
    method: 'GET',
  })

  const payload = { percent }

  if (items[0]?.id != null) {
    return apiRequest<ProcSettings>(`/proc/${items[0].id}`, {
      method: 'PATCH',
      body: payload,
      token,
    })
  }

  return apiRequest<ProcSettings>('/proc', {
    method: 'POST',
    body: payload,
    token,
  })
}

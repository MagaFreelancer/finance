import type { Locale } from '../i18n/translations'
import { localeMeta } from '../i18n/translations'

function bcp47(locale: Locale) {
  return localeMeta.find((item) => item.code === locale)?.bcp47 ?? 'ru-RU'
}

export function formatMoney(value: number, locale: Locale = 'ru'): string {
  return new Intl.NumberFormat(bcp47(locale), {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: Number.isInteger(value) ? 0 : 2,
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
  }).format(value)
}

export function formatNumber(value: number, locale: Locale = 'ru'): string {
  return new Intl.NumberFormat(bcp47(locale)).format(value)
}

export function formatTerm(months: number, locale: Locale = 'ru'): string {
  if (locale === 'en') {
    return months === 1 ? `${months} month` : `${months} months`
  }

  if (locale === 'tr') {
    return `${months} ay`
  }

  if (locale === 'ar') {
    if (months === 1) return 'شهر واحد'
    if (months === 2) return 'شهرين'
    if (months >= 3 && months <= 10) return `${months} أشهر`
    return `${months} شهرًا`
  }

  const mod10 = months % 10
  const mod100 = months % 100

  let word = 'месяцев'
  if (mod100 < 11 || mod100 > 14) {
    if (mod10 === 1) word = 'месяц'
    else if (mod10 >= 2 && mod10 <= 4) word = 'месяца'
  }

  return `${months} ${word}`
}

export function formatDateTime(iso: string, locale: Locale = 'ru'): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'

  return new Intl.DateTimeFormat(bcp47(locale), {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

import type { InstallmentResult } from '../types'

export const AMOUNT_MIN = 10_000
export const AMOUNT_MAX = 1_000_000
export const AMOUNT_STEP = 1_000
export const AMOUNT_DEFAULT = 100_000

export const TERM_MIN = 3
export const TERM_MAX = 36
export const TERM_STEP = 1
export const TERM_DEFAULT = 12

export const DOWN_MIN = 0
export const DOWN_STEP = 1_000
export const DOWN_DEFAULT = 0

export const DEFAULT_PERCENT = 30

/**
 * Remaining amount after the down payment is marked up by `percent`
 * and split into equal monthly payments.
 */
export function calculateInstallment(
  amount: number,
  term: number,
  downPayment = DOWN_DEFAULT,
  percent = DEFAULT_PERCENT,
): InstallmentResult {
  const safeAmount = Math.max(amount, 0)
  const safeTerm = Math.max(Math.floor(term), 1)
  const safeDown = Math.min(Math.max(downPayment, 0), safeAmount)
  const safePercent = Math.max(percent, 0)
  const financedAmount = Math.round((safeAmount - safeDown) * 100) / 100
  const totalAmount =
    Math.round(financedAmount * (1 + safePercent / 100) * 100) / 100

  const monthlyPayment =
    Math.round((totalAmount / safeTerm) * 100) / 100
  const paidBeforeLast = Math.round(monthlyPayment * (safeTerm - 1) * 100) / 100
  const lastPayment = Math.round((totalAmount - paidBeforeLast) * 100) / 100

  return {
    amount: safeAmount,
    term: safeTerm,
    downPayment: safeDown,
    financedAmount,
    percent: safePercent,
    monthlyPayment,
    lastPayment,
    paymentsCount: safeTerm,
    totalAmount,
    hasUnevenLastPayment: lastPayment !== monthlyPayment,
  }
}

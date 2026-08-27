import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { getPercent } from '../../api/proc'
import { useI18n } from '../../i18n/I18nProvider'
import {
  AMOUNT_DEFAULT,
  DEFAULT_PERCENT,
  TERM_DEFAULT,
  calculateInstallment,
} from '../../lib/calculator'
import { formatMoney, formatNumber } from '../../lib/format'
import styles from './Hero.module.css'

const TERM_OPTIONS = [6, 12, 24]
const DOWN_OPTIONS = [0, 20, 40]

export function HeroCharts() {
  const { dict, locale } = useI18n()
  const t = dict.charts
  const [percent, setPercent] = useState(DEFAULT_PERCENT)
  const [term, setTerm] = useState(TERM_DEFAULT)
  const [downPct, setDownPct] = useState(20)
  const [hoverMonth, setHoverMonth] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const value = await getPercent()
        if (!cancelled) setPercent(value)
      } catch {
        if (!cancelled) setPercent(DEFAULT_PERCENT)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const amount = AMOUNT_DEFAULT
  const downPayment = Math.round((amount * downPct) / 100)
  const result = useMemo(
    () => calculateInstallment(amount, term, downPayment, percent),
    [amount, term, downPayment, percent],
  )

  const payments = useMemo(() => {
    return Array.from({ length: result.paymentsCount }, (_, index) => {
      const isLast = index === result.paymentsCount - 1
      return isLast ? result.lastPayment : result.monthlyPayment
    })
  }, [result])

  const remaining = useMemo(() => {
    let left = result.totalAmount
    return payments.map((payment) => {
      left = Math.max(0, Math.round((left - payment) * 100) / 100)
      return left
    })
  }, [payments, result.totalAmount])

  const maxPayment = Math.max(...payments, 1)
  const maxRemain = Math.max(...remaining, 1)
  const downRatio = amount > 0 ? downPayment / amount : 0
  const hoverIndex = hoverMonth == null ? null : hoverMonth - 1
  const hoverPayment =
    hoverIndex != null ? payments[hoverIndex] : result.monthlyPayment
  const hoverRemain = hoverIndex != null ? remaining[hoverIndex] : result.totalAmount

  const donut = {
    r: 36,
    c: 2 * Math.PI * 36,
  }
  const downArc = donut.c * downRatio
  const financedArc = donut.c - downArc

  return (
    <div className={styles.charts} aria-label={t.schedule}>
      <div className={styles.chartHead}>
        <span>{t.monthly}</span>
        <strong>{formatMoney(result.monthlyPayment, locale)}</strong>
      </div>

      <div className={styles.chips}>
        <div className={styles.chipGroup} role="group" aria-label={t.term}>
          {TERM_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={term === value ? styles.chipActive : styles.chip}
              onClick={() => setTerm(value)}
            >
              {value} {t.month}
            </button>
          ))}
        </div>
        <div className={styles.chipGroup} role="group" aria-label={t.downShare}>
          {DOWN_OPTIONS.map((value) => (
            <button
              key={value}
              type="button"
              className={downPct === value ? styles.chipActive : styles.chip}
              onClick={() => setDownPct(value)}
            >
              {value}%
            </button>
          ))}
        </div>
      </div>

      <div className={styles.chartBody}>
        <div className={styles.donutWrap}>
          <svg viewBox="0 0 100 100" className={styles.donut} aria-hidden>
            <circle
              cx="50"
              cy="50"
              r={donut.r}
              fill="none"
              stroke="rgba(41, 68, 82, 0.1)"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r={donut.r}
              fill="none"
              stroke="#294452"
              strokeWidth="12"
              strokeDasharray={`${financedArc} ${donut.c}`}
              strokeDashoffset={donut.c * 0.25}
              strokeLinecap="round"
            />
            <circle
              cx="50"
              cy="50"
              r={donut.r}
              fill="none"
              stroke="#7d9aaa"
              strokeWidth="12"
              strokeDasharray={`${downArc} ${donut.c}`}
              strokeDashoffset={donut.c * 0.25 - financedArc}
              strokeLinecap="round"
            />
          </svg>
          <div className={styles.donutLabel}>
            <small>{t.split}</small>
            <b>{downPct}%</b>
          </div>
        </div>

        <ul className={styles.legend}>
          <li>
            <i className={styles.dotFinanced} />
            <span>{t.financed}</span>
            <b>{formatMoney(result.financedAmount, locale)}</b>
          </li>
          <li>
            <i className={styles.dotDown} />
            <span>{t.down}</span>
            <b>{formatMoney(result.downPayment, locale)}</b>
          </li>
        </ul>
      </div>

      <div className={styles.barsWrap}>
        <div className={styles.barsLabel}>
          <span>{t.schedule}</span>
          <span>
            {hoverMonth
              ? `${hoverMonth} · ${formatMoney(hoverPayment, locale)}`
              : t.hoverBar}
          </span>
        </div>
        <div className={styles.bars} onMouseLeave={() => setHoverMonth(null)}>
          {payments.map((payment, index) => {
            const height = Math.max(8, (payment / maxPayment) * 100)
            const remainH = Math.max(6, (remaining[index] / maxRemain) * 100)
            const active = hoverMonth === index + 1
            return (
              <button
                key={index}
                type="button"
                className={`${styles.barCol} ${active ? styles.barActive : ''}`}
                style={{ '--h': `${height}%`, '--r': `${remainH}%` } as CSSProperties}
                onMouseEnter={() => setHoverMonth(index + 1)}
                onFocus={() => setHoverMonth(index + 1)}
                aria-label={`${index + 1} ${t.month}: ${formatMoney(payment, locale)}`}
              >
                <span className={styles.remain} />
                <span className={styles.bar} />
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.chartMeta}>
        <div>
          <span>{formatNumber(amount, locale)} ₽</span>
          <b>{result.percent}%</b>
        </div>
        {hoverMonth ? (
          <p>
            {t.remaining}: {formatMoney(hoverRemain, locale)}
          </p>
        ) : (
          <p>
            {t.term}: {term} {t.month}
          </p>
        )}
      </div>
    </div>
  )
}

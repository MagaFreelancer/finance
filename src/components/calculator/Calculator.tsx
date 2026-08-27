import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from 'react'
import { createOrder } from '../../api/orders'
import { getPercent } from '../../api/proc'
import { ApiError } from '../../api/client'
import {
  AMOUNT_DEFAULT,
  AMOUNT_MAX,
  AMOUNT_MIN,
  AMOUNT_STEP,
  DEFAULT_PERCENT,
  DOWN_DEFAULT,
  DOWN_MIN,
  DOWN_STEP,
  TERM_DEFAULT,
  TERM_MAX,
  TERM_MIN,
  TERM_STEP,
  calculateInstallment,
} from '../../lib/calculator'
import { formatMoney, formatNumber, formatTerm } from '../../lib/format'
import {
  validateApplicationForm,
  type ApplicationFormErrors,
  type ApplicationFormValues,
} from '../../lib/validation'
import { useToast } from '../../hooks/useToast'
import styles from './Calculator.module.css'

const initialForm: ApplicationFormValues = {
  productName: '',
  purchasePlace: '',
  fullName: '',
  phone: '',
}

function clampToStep(value: number, min: number, max: number, step: number) {
  const clamped = Math.min(max, Math.max(min, value))
  const stepped = Math.round((clamped - min) / step) * step + min
  return Math.min(max, Math.max(min, stepped))
}

function parseDigits(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits ? Number(digits) : NaN
}

export interface ProductPrefill {
  title: string
  nonce: number
}

interface CalculatorProps {
  productPrefill?: ProductPrefill | null
}

export function Calculator({ productPrefill = null }: CalculatorProps) {
  const { showToast } = useToast()
  const [amount, setAmount] = useState(AMOUNT_DEFAULT)
  const [term, setTerm] = useState(TERM_DEFAULT)
  const [downPayment, setDownPayment] = useState(DOWN_DEFAULT)
  const [percent, setPercent] = useState(DEFAULT_PERCENT)
  const [amountDraft, setAmountDraft] = useState(formatNumber(AMOUNT_DEFAULT))
  const [termDraft, setTermDraft] = useState(String(TERM_DEFAULT))
  const [downDraft, setDownDraft] = useState(formatNumber(DOWN_DEFAULT))
  const [form, setForm] = useState<ApplicationFormValues>(initialForm)
  const [errors, setErrors] = useState<ApplicationFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

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

  useEffect(() => {
    if (!productPrefill) return

    setSuccess(false)
    setForm((prev) => ({ ...prev, productName: productPrefill.title }))
    setErrors((prev) => ({ ...prev, productName: undefined }))

    const timer = window.setTimeout(() => {
      document.getElementById('application')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
      document.getElementById('productName')?.focus()
    }, 50)

    return () => window.clearTimeout(timer)
  }, [productPrefill])

  const result = useMemo(
    () => calculateInstallment(amount, term, downPayment, percent),
    [amount, term, downPayment, percent],
  )

  const updateDown = (value: number, maxAmount = amount) => {
    const next = clampToStep(value, DOWN_MIN, maxAmount, DOWN_STEP)
    setDownPayment(next)
    setDownDraft(formatNumber(next))
  }

  const updateAmount = (value: number) => {
    const next = clampToStep(value, AMOUNT_MIN, AMOUNT_MAX, AMOUNT_STEP)
    setAmount(next)
    setAmountDraft(formatNumber(next))
    if (downPayment > next) {
      updateDown(next, next)
    }
  }

  const updateTerm = (value: number) => {
    const next = clampToStep(value, TERM_MIN, TERM_MAX, TERM_STEP)
    setTerm(next)
    setTermDraft(String(next))
  }

  const onAmountDraftChange = (value: string) => {
    const cleaned = value.replace(/[^\d\s]/g, '')
    setAmountDraft(cleaned)

    const parsed = parseDigits(cleaned)
    if (!Number.isNaN(parsed)) {
      const live = Math.min(AMOUNT_MAX, Math.max(0, parsed))
      setAmount(live)
      if (downPayment > live) {
        setDownPayment(live)
        setDownDraft(formatNumber(live))
      }
    }
  }

  const onAmountBlur = () => {
    const parsed = parseDigits(amountDraft)
    updateAmount(Number.isNaN(parsed) ? amount : parsed)
  }

  const onTermDraftChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    setTermDraft(cleaned)

    const parsed = cleaned ? Number(cleaned) : NaN
    if (!Number.isNaN(parsed)) {
      const live = Math.min(TERM_MAX, Math.max(1, parsed))
      setTerm(live)
    }
  }

  const onTermBlur = () => {
    const parsed = termDraft ? Number(termDraft) : NaN
    updateTerm(Number.isNaN(parsed) ? term : parsed)
  }

  const onDownDraftChange = (value: string) => {
    const cleaned = value.replace(/[^\d\s]/g, '')
    setDownDraft(cleaned)

    const parsed = parseDigits(cleaned)
    if (!Number.isNaN(parsed)) {
      const live = Math.min(amount, Math.max(DOWN_MIN, parsed))
      setDownPayment(live)
    }
  }

  const onDownBlur = () => {
    const parsed = parseDigits(downDraft)
    updateDown(Number.isNaN(parsed) ? downPayment : parsed)
  }

  const updateField = (field: keyof ApplicationFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    updateAmount(amount)
    updateTerm(term)
    updateDown(downPayment)

    const nextErrors = validateApplicationForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSubmitting(true)

    try {
      const final = calculateInstallment(
        clampToStep(amount, AMOUNT_MIN, AMOUNT_MAX, AMOUNT_STEP),
        clampToStep(term, TERM_MIN, TERM_MAX, TERM_STEP),
        clampToStep(downPayment, DOWN_MIN, amount, DOWN_STEP),
        percent,
      )

      await createOrder({
        productName: form.productName.trim(),
        purchasePlace: form.purchasePlace.trim(),
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        amount: final.amount,
        term: final.term,
        monthlyPayment: final.monthlyPayment,
        totalAmount: final.totalAmount,
        downPayment: final.downPayment,
        percent: final.percent,
        isRead: false,
        createdAt: new Date().toISOString(),
      })

      setForm(initialForm)
      setErrors({})
      setSuccess(true)
      showToast('Заявка успешно отправлена', 'success')
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : 'Не удалось отправить заявку. Попробуйте ещё раз.'
      showToast(message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const amountProgress = ((amount - AMOUNT_MIN) / (AMOUNT_MAX - AMOUNT_MIN)) * 100
  const termProgress = ((term - TERM_MIN) / (TERM_MAX - TERM_MIN)) * 100
  const downProgress = amount > 0 ? (downPayment / amount) * 100 : 0

  return (
    <section className={`section ${styles.section}`} id="calculator">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Калькулятор</span>
          <h2 className="section-title">Рассчитайте рассрочку</h2>
          <p className="section-subtitle">
            Укажите стоимость покупки, взнос и удобный срок — затем сразу отправьте заявку.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.controls}>
            <div className={styles.control}>
              <div className={styles.controlHead}>
                <label htmlFor="amount-input">Сумма покупки</label>
                <div className={styles.valueField}>
                  <input
                    id="amount-input"
                    type="text"
                    inputMode="numeric"
                    value={amountDraft}
                    onChange={(e) => onAmountDraftChange(e.target.value)}
                    onBlur={onAmountBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur()
                      }
                    }}
                    aria-label="Сумма покупки"
                  />
                  <span>₽</span>
                </div>
              </div>
              <div className={styles.sliderWrap}>
                <input
                  type="range"
                  min={AMOUNT_MIN}
                  max={AMOUNT_MAX}
                  step={AMOUNT_STEP}
                  value={clampToStep(amount, AMOUNT_MIN, AMOUNT_MAX, AMOUNT_STEP)}
                  onChange={(e) => updateAmount(Number(e.target.value))}
                  aria-label="Сумма покупки, ползунок"
                  className={styles.slider}
                  style={{ '--progress': `${Math.min(100, Math.max(0, amountProgress))}%` } as CSSProperties}
                />
              </div>
              <div className={styles.rangeHints}>
                <span>{formatNumber(AMOUNT_MIN)} ₽</span>
                <span>{formatNumber(AMOUNT_MAX)} ₽</span>
              </div>
            </div>

            <div className={styles.control}>
              <div className={styles.controlHead}>
                <label htmlFor="down-input">Первоначальный взнос</label>
                <div className={styles.valueField}>
                  <input
                    id="down-input"
                    type="text"
                    inputMode="numeric"
                    value={downDraft}
                    onChange={(e) => onDownDraftChange(e.target.value)}
                    onBlur={onDownBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur()
                      }
                    }}
                    aria-label="Первоначальный взнос"
                  />
                  <span>₽</span>
                </div>
              </div>
              <div className={styles.sliderWrap}>
                <input
                  type="range"
                  min={DOWN_MIN}
                  max={amount}
                  step={DOWN_STEP}
                  value={Math.min(downPayment, amount)}
                  onChange={(e) => updateDown(Number(e.target.value))}
                  aria-label="Первоначальный взнос, ползунок"
                  className={styles.slider}
                  style={{ '--progress': `${Math.min(100, Math.max(0, downProgress))}%` } as CSSProperties}
                />
              </div>
              <div className={styles.rangeHints}>
                <span>{formatNumber(DOWN_MIN)} ₽</span>
                <span>{formatNumber(amount)} ₽</span>
              </div>
            </div>

            <div className={styles.control}>
              <div className={styles.controlHead}>
                <label htmlFor="term-input">Срок рассрочки</label>
                <div className={styles.valueField}>
                  <input
                    id="term-input"
                    type="text"
                    inputMode="numeric"
                    value={termDraft}
                    onChange={(e) => onTermDraftChange(e.target.value)}
                    onBlur={onTermBlur}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur()
                      }
                    }}
                    aria-label="Срок рассрочки"
                  />
                  <span>мес.</span>
                </div>
              </div>
              <div className={styles.sliderWrap}>
                <input
                  type="range"
                  min={TERM_MIN}
                  max={TERM_MAX}
                  step={TERM_STEP}
                  value={clampToStep(term, TERM_MIN, TERM_MAX, TERM_STEP)}
                  onChange={(e) => updateTerm(Number(e.target.value))}
                  aria-label="Срок рассрочки, ползунок"
                  className={styles.slider}
                  style={{ '--progress': `${Math.min(100, Math.max(0, termProgress))}%` } as CSSProperties}
                />
              </div>
              <div className={styles.rangeHints}>
                <span>{TERM_MIN} мес.</span>
                <span>{TERM_MAX} мес.</span>
              </div>
              <p className={styles.termHint}>{formatTerm(term)}</p>
            </div>
          </div>

          <div className={styles.aside}>
            <div className={styles.result}>
              <span className={styles.resultLabel}>Ежемесячный платёж</span>
              <div className={styles.resultValue}>
                {formatMoney(result.monthlyPayment)}
              </div>
              {result.hasUnevenLastPayment ? (
                <p className={styles.note}>
                  Последний платёж: {formatMoney(result.lastPayment)}
                </p>
              ) : <div className={styles.place}></div>}

              <div className={styles.meta}>
                <div>
                  <span>Стоимость покупки</span>
                  <b>{formatMoney(result.amount)}</b>
                </div>
                <div>
                  <span>Первоначальный взнос</span>
                  <b>{formatMoney(result.downPayment)}</b>
                </div>
                <div>
                  <span>Срок</span>
                  <b>{formatTerm(result.term)}</b>
                </div>
                <div>
                  <span>Итоговый процент</span>
                  <b>{result.percent}%</b>
                </div>
                <div>
                  <span>Количество платежей</span>
                  <b>{result.paymentsCount}</b>
                </div>
                <div>
                  <span>Общая сумма</span>
                  <b>{formatMoney(result.totalAmount)}</b>
                </div>
              </div>
            </div>

            {success ? (
              <div className={styles.success} role="status">
                <div className={styles.successIcon} aria-hidden>
                  ✓
                </div>
                <h3>Заявка успешно отправлена</h3>
                <p>Мы свяжемся с вами в ближайшее время.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSuccess(false)}
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                id="application"
                onSubmit={onSubmit}
                noValidate
              >
                <h3>Оставить заявку</h3>
                <p className={styles.formLead}>
                  Данные расчёта будут прикреплены автоматически.
                </p>

                <div className="field">
                  <label htmlFor="productName">Наименование товара или услуги</label>
                  <input
                    id="productName"
                    value={form.productName}
                    onChange={(e) => updateField('productName', e.target.value)}
                    className={errors.productName ? 'error' : ''}
                    placeholder="Например, смартфон"
                    autoComplete="off"
                  />
                  {errors.productName && (
                    <span className="field-error">{errors.productName}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="purchasePlace">Место покупки</label>
                  <input
                    id="purchasePlace"
                    value={form.purchasePlace}
                    onChange={(e) => updateField('purchasePlace', e.target.value)}
                    className={errors.purchasePlace ? 'error' : ''}
                    placeholder="Магазин или сайт"
                    autoComplete="off"
                  />
                  {errors.purchasePlace && (
                    <span className="field-error">{errors.purchasePlace}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="fullName">Ваше ФИО</label>
                  <input
                    id="fullName"
                    value={form.fullName}
                    onChange={(e) => updateField('fullName', e.target.value)}
                    className={errors.fullName ? 'error' : ''}
                    placeholder="Иванов Иван Иванович"
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <span className="field-error">{errors.fullName}</span>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="phone">Личный телефон</label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className={errors.phone ? 'error' : ''}
                    placeholder="+7 900 000-00-00"
                    autoComplete="tel"
                  />
                  {errors.phone && (
                    <span className="field-error">{errors.phone}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submit}`}
                  disabled={submitting}
                >
                  {submitting && <span className="spinner" />}
                  {submitting ? 'Отправляем…' : 'Отправить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

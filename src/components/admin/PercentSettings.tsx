import { useEffect, useState, type FormEvent } from 'react'
import { getPercent, savePercent } from '../../api/proc'
import { ApiError } from '../../api/client'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { DEFAULT_PERCENT } from '../../lib/calculator'
import styles from './AdminPanels.module.css'

export function PercentSettings() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [value, setValue] = useState(String(DEFAULT_PERCENT))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const percent = await getPercent()
        if (!cancelled) setValue(String(percent))
      } catch {
        if (!cancelled) setValue(String(DEFAULT_PERCENT))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!token) return

    const parsed = Number(value.replace(',', '.'))
    if (!Number.isFinite(parsed) || parsed < 0) {
      showToast('Укажите корректный процент', 'error')
      return
    }

    setSaving(true)
    try {
      const saved = await savePercent(parsed, token)
      setValue(String(saved.percent))
      showToast('Процент сохранён', 'success')
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Не удалось сохранить процент'
      showToast(message, 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <div>
          <h2>Итоговый процент</h2>
          <p>Наценка, которая используется в калькуляторе на лендинге.</p>
        </div>
      </div>

      <form className={styles.percentForm} onSubmit={(e) => void onSubmit(e)}>
        <div className="field">
          <label htmlFor="admin-percent">Процент</label>
          <div className={styles.percentField}>
            <input
              id="admin-percent"
              type="number"
              min={0}
              step={0.1}
              value={value}
              disabled={loading || saving}
              onChange={(e) => setValue(e.target.value)}
            />
            <span>%</span>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={loading || saving}
        >
          {saving && <span className="spinner" />}
          {saving ? 'Сохраняем…' : 'Сохранить'}
        </button>
      </form>
    </section>
  )
}

import { useState, type FormEvent } from 'react'
import { ApiError } from '../api/client'
import { useAuth } from '../hooks/useAuth'
import styles from './AdminLogin.module.css'

export function AdminLogin() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Введите логин и пароль')
      return
    }

    setLoading(true)
    try {
      await login(email.trim(), password)
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Не удалось выполнить вход. Попробуйте снова.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <a href="/" className={styles.logo}>
          <span className={styles.mark} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 22V10l8 5.5L24 10v12h-3.2V14.8L16 18.2l-4.8-3.4V22H8z"
                fill="currentColor"
              />
            </svg>
          </span>
          Амана
        </a>

        <h1>Вход в админ-панель</h1>
        <p className={styles.lead}>Управление заявками сервиса исламской рассрочки.</p>

        <form onSubmit={onSubmit} className={styles.form} noValidate>
          <div className="field">
            <label htmlFor="admin-email">Логин</label>
            <input
              id="admin-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              placeholder="Введите логин"
            />
          </div>

          <div className="field">
            <label htmlFor="admin-password">Пароль</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Введите пароль"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading && <span className="spinner" />}
            {loading ? 'Входим…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}

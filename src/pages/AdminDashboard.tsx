import { useCallback, useEffect, useMemo, useState } from 'react'
import { deleteOrder, getOrders, markOrderAsRead } from '../api/orders'
import { ApiError } from '../api/client'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { calculateOrderStats } from '../lib/statistics'
import { formatDateTime, formatMoney, formatTerm } from '../lib/format'
import type { Order } from '../types'
import { CardsManager } from '../components/admin/CardsManager'
import { PercentSettings } from '../components/admin/PercentSettings'
import styles from './AdminDashboard.module.css'

const PAGE_SIZE = 10

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const { showToast } = useToast()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [actionId, setActionId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Order | null>(null)
  const [deleting, setDeleting] = useState(false)

  const loadOrders = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getOrders()
      setOrders(data)
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Не удалось загрузить заявки'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadOrders()
  }, [loadOrders])

  const stats = useMemo(() => calculateOrderStats(orders), [orders])

  const totalPages = Math.max(1, Math.ceil(orders.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageOrders = orders.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const onMarkRead = async (order: Order) => {
    if (order.isRead) return
    setActionId(order.id)
    try {
      const updated = await markOrderAsRead(order.id)
      setOrders((prev) =>
        prev.map((item) => (item.id === order.id ? { ...item, ...updated } : item)),
      )
      showToast('Заявка отмечена как прочитанная', 'success')
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Не удалось обновить статус'
      showToast(message, 'error')
    } finally {
      setActionId(null)
    }
  }

  const onConfirmDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await deleteOrder(deleteTarget.id)
      setOrders((prev) => prev.filter((item) => item.id !== deleteTarget.id))
      setDeleteTarget(null)
      showToast('Заявка удалена', 'success')
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Не удалось удалить заявку'
      showToast(message, 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <div className={styles.brand}>
            <a href="/" className={styles.logo}>
              <span className={styles.mark} aria-hidden>
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M8 22V10l8 5.5L24 10v12h-3.2V14.8L16 18.2l-4.8-3.4V22H8z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              Амана Admin
            </a>
            <span className={styles.user}>
              {user?.fullName || user?.email || 'Администратор'}
            </span>
          </div>
          <div className={styles.headerActions}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => void loadOrders()}>
              Обновить
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={logout}>
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className={`container ${styles.main}`}>
        <div className={styles.titleRow}>
          <div>
            <h1>Панель управления</h1>
            <p>Заявки, карточки товаров и процент калькулятора</p>
          </div>
        </div>

        <PercentSettings />

        <CardsManager />

        <div className={styles.stats}>
          {[
            { label: 'Заявки сегодня', value: stats.today },
            { label: 'Заявки за неделю', value: stats.week },
            { label: 'Заявки за месяц', value: stats.month },
            { label: 'Всего заявок', value: stats.total },
          ].map((item) => (
            <article key={item.label} className={styles.statCard}>
              <span>{item.label}</span>
              <strong>{loading ? '—' : item.value}</strong>
            </article>
          ))}
        </div>

        <section className={styles.tableCard}>
          <div className={styles.tableHead}>
            <h2>Список заявок</h2>
            {!loading && <span>{orders.length} всего</span>}
          </div>

          {loading && (
            <div className={styles.skeletons}>
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={`skeleton ${styles.skeletonRow}`} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className={styles.state}>
              <p>{error}</p>
              <button type="button" className="btn btn-primary btn-sm" onClick={() => void loadOrders()}>
                Повторить
              </button>
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className={styles.state}>
              <h3>Заявок пока нет</h3>
              <p>Новые обращения появятся здесь после отправки с лендинга.</p>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Статус</th>
                      <th>Дата</th>
                      <th>ФИО</th>
                      <th>Телефон</th>
                      <th>Товар / услуга</th>
                      <th>Место покупки</th>
                      <th>Сумма</th>
                      <th>Срок</th>
                      <th>Платёж</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageOrders.map((order) => (
                      <tr
                        key={order.id}
                        className={!order.isRead ? styles.unread : undefined}
                      >
                        <td>
                          <span
                            className={`${styles.badge} ${
                              order.isRead ? styles.read : styles.new
                            }`}
                          >
                            <i />
                            {order.isRead ? 'Прочитана' : 'Новая'}
                          </span>
                        </td>
                        <td>{formatDateTime(order.createdAt)}</td>
                        <td>{order.fullName}</td>
                        <td>
                          <a href={`tel:${order.phone}`}>{order.phone}</a>
                        </td>
                        <td>{order.productName}</td>
                        <td>{order.purchasePlace}</td>
                        <td>{formatMoney(order.amount)}</td>
                        <td>{formatTerm(order.term)}</td>
                        <td>{formatMoney(order.monthlyPayment)}</td>
                        <td>
                          <div className={styles.actions}>
                            {!order.isRead && (
                              <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                disabled={actionId === order.id}
                                onClick={() => void onMarkRead(order)}
                              >
                                {actionId === order.id ? '…' : 'Прочитано'}
                              </button>
                            )}
                            <button
                              type="button"
                              className={`btn btn-sm ${styles.deleteBtn}`}
                              onClick={() => setDeleteTarget(order)}
                            >
                              Удалить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className={styles.pagination}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={currentPage <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Назад
                  </button>
                  <span>
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    disabled={currentPage >= totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Вперёд
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      {deleteTarget && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
          >
            <h3 id="delete-title">Удалить заявку?</h3>
            <p>
              Заявка от {deleteTarget.fullName} будет удалена без возможности
              восстановления.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
              >
                Отмена
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={deleting}
                onClick={() => void onConfirmDelete()}
              >
                {deleting && <span className="spinner" />}
                {deleting ? 'Удаляем…' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

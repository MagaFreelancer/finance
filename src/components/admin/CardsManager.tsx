import { useCallback, useEffect, useState, type FormEvent } from 'react'
import {
  createCard,
  deleteCard,
  getCards,
  updateCard,
} from '../../api/cards'
import { ApiError } from '../../api/client'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { isHttpUrl } from '../../lib/validation'
import type { ProductCard } from '../../types'
import styles from './AdminPanels.module.css'

const emptyForm = {
  title: '',
  imageUrl: '',
}

export function CardsManager() {
  const { token } = useAuth()
  const { showToast } = useToast()
  const [cards, setCards] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editing, setEditing] = useState<ProductCard | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ProductCard | null>(null)
  const [deleting, setDeleting] = useState(false)

  const loadCards = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getCards()
      setCards(data)
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Не удалось загрузить карточки',
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadCards()
  }, [loadCards])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setFormError('')
    setEditorOpen(true)
  }

  const openEdit = (card: ProductCard) => {
    setEditing(card)
    setForm({ title: card.title, imageUrl: card.imageUrl })
    setFormError('')
    setEditorOpen(true)
  }

  const closeEditor = () => {
    if (saving) return
    setEditorOpen(false)
    setEditing(null)
    setForm(emptyForm)
    setFormError('')
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!token) return

    const title = form.title.trim()
    const imageUrl = form.imageUrl.trim()

    if (!title) {
      setFormError('Укажите название товара')
      return
    }

    if (!isHttpUrl(imageUrl)) {
      setFormError('Добавьте картинку только по ссылке http или https')
      return
    }

    setSaving(true)
    try {
      if (editing) {
        const updated = await updateCard(editing.id, { title, imageUrl }, token)
        setCards((prev) =>
          prev.map((item) => (item.id === editing.id ? updated : item)),
        )
        showToast('Карточка обновлена', 'success')
      } else {
        const created = await createCard({ title, imageUrl }, token)
        setCards((prev) => [created, ...prev])
        showToast('Карточка добавлена', 'success')
      }
      setEditorOpen(false)
      setEditing(null)
      setForm(emptyForm)
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Не удалось сохранить карточку'
      showToast(message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const onConfirmDelete = async () => {
    if (!deleteTarget || !token) return
    setDeleting(true)
    try {
      await deleteCard(deleteTarget.id, token)
      setCards((prev) => prev.filter((item) => item.id !== deleteTarget.id))
      setDeleteTarget(null)
      showToast('Карточка удалена', 'success')
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : 'Не удалось удалить карточку'
      showToast(message, 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <section className={styles.panel}>
      <div className={styles.panelHead}>
        <div>
          <h2>Карточки товаров</h2>
          <p>Изображение можно добавить только ссылкой.</p>
        </div>
        <button type="button" className="btn btn-primary btn-sm" onClick={openCreate}>
          Добавить карточку
        </button>
      </div>

      {loading && (
        <div className={styles.skeletons}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={`skeleton ${styles.skeleton}`} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className={styles.state}>
          <p>{error}</p>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => void loadCards()}>
            Повторить
          </button>
        </div>
      )}

      {!loading && !error && cards.length === 0 && (
        <div className={styles.state}>
          <h3>Карточек пока нет</h3>
          <p>Добавьте первый товар, чтобы он появился на лендинге.</p>
        </div>
      )}

      {!loading && !error && cards.length > 0 && (
        <div className={styles.cardsGrid}>
          {cards.map((card) => (
            <article key={card.id} className={styles.adminCard}>
              <div className={styles.adminImage}>
                <img src={card.imageUrl} alt={card.title} />
              </div>
              <div className={styles.adminBody}>
                <h3>{card.title}</h3>
                <div className={styles.actions}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => openEdit(card)}
                  >
                    Изменить
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${styles.deleteBtn}`}
                    onClick={() => setDeleteTarget(card)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {editorOpen && (
        <div className="modal-backdrop" role="presentation">
          <div
            className={`modal ${styles.wideModal}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-editor-title"
          >
            <h3 id="card-editor-title">
              {editing ? 'Изменить карточку' : 'Новая карточка'}
            </h3>
            <form className={styles.editorForm} onSubmit={(e) => void onSubmit(e)}>
              <div className="field">
                <label htmlFor="card-title">Название товара</label>
                <input
                  id="card-title"
                  value={form.title}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                    setFormError('')
                  }}
                  placeholder="Например, смартфон"
                />
              </div>
              <div className="field">
                <label htmlFor="card-image">Ссылка на изображение</label>
                <input
                  id="card-image"
                  value={form.imageUrl}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, imageUrl: e.target.value }))
                    setFormError('')
                  }}
                  placeholder="https://..."
                  inputMode="url"
                />
              </div>
              {isHttpUrl(form.imageUrl) && (
                <div className={styles.preview}>
                  <img src={form.imageUrl.trim()} alt="Предпросмотр" />
                </div>
              )}
              {formError && <p className={styles.formError}>{formError}</p>}
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={saving}
                  onClick={closeEditor}
                >
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving && <span className="spinner" />}
                  {saving ? 'Сохраняем…' : 'Сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-card-title"
          >
            <h3 id="delete-card-title">Удалить карточку?</h3>
            <p>
              «{deleteTarget.title}» будет удалена и больше не отобразится на
              лендинге.
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
    </section>
  )
}

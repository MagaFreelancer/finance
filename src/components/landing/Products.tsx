import { useEffect, useState } from 'react'
import { getCards } from '../../api/cards'
import { ApiError } from '../../api/client'
import type { ProductCard } from '../../types'
import { Reveal } from '../ui/Reveal'
import styles from './Products.module.css'

interface ProductsProps {
  onApply: (title: string) => void
}

export function Products({ onApply }: ProductsProps) {
  const [cards, setCards] = useState<ProductCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const data = await getCards()
        if (!cancelled) setCards(data)
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : 'Не удалось загрузить товары',
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className={`section ${styles.section}`} id="products">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Каталог</span>
          <h2 className="section-title">Самые покупаемые товары</h2>
          <p className="section-subtitle">
            Выберите товар и оформите заявку — название подставится в форму
            автоматически.
          </p>
        </div>

        {loading && (
          <div className={styles.grid}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className={`skeleton ${styles.skeleton}`} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className={styles.state}>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && cards.length === 0 && (
          <div className={styles.state}>
            <p>Товары скоро появятся в этом разделе.</p>
          </div>
        )}

        {!loading && !error && cards.length > 0 && (
          <div className={styles.grid}>
            {cards.map((card, index) => (
              <Reveal
                key={card.id}
                delay={index * 60}
                as="article"
                className={styles.card}
              >
                <div className={styles.imageWrap}>
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    loading="lazy"
                  />
                </div>
                <div className={styles.body}>
                  <h3>{card.title}</h3>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onApply(card.title)}
                  >
                    Оформить заявку
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

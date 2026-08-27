import { Reveal } from '../ui/Reveal'
import styles from './Benefits.module.css'

const items = [
  {
    title: 'Без процентов',
    text: 'Прозрачные условия без начисления процентов и скрытых переплат.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'По принципам шариата',
    text: 'Финансирование строится с учётом принципов исламского финансирования.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: 'Прозрачные условия',
    text: 'Вы заранее понимаете стоимость покупки и график платежей.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Просто и удобно',
    text: 'Минимум действий: рассчитайте рассрочку и отправьте заявку онлайн.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12l4.5 4.5L19 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export function Benefits() {
  return (
    <section className={`section ${styles.section}`} id="about">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">О сервисе</span>
          <h2 className="section-title">Честная рассрочка без лишнего</h2>
          <p className="section-subtitle">
            Амана помогает оформить покупку прозрачно: вы видите сумму, срок и
            платёж ещё до подачи заявки.
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70} as="article" className={styles.card}>
              <div className={styles.icon}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

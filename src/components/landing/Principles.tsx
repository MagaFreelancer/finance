import styles from './Principles.module.css'

const principles = [
  {
    title: 'Без риба',
    text: 'Мы не используем процентную модель. Стоимость сделки фиксируется заранее.',
  },
  {
    title: 'Прозрачность',
    text: 'Вы видите сумму покупки, срок и ежемесячный платёж до отправки заявки.',
  },
  {
    title: 'Договорённость сторон',
    text: 'Условия согласуются открыто — без скрытых комиссий и неожиданных начислений.',
  },
]

export function Principles() {
  return (
    <section className={`section ${styles.section}`} id="principles">
      <div className={`container ${styles.wrap}`}>
        <div className={styles.copy}>
          <span className="section-eyebrow">Принципы</span>
          <h2 className="section-title">Финансирование, которому можно доверять</h2>
          <p className="section-subtitle">
            Амана ориентирована на спокойный и понятный формат рассрочки —
            без процентной ставки и без давления.
          </p>
        </div>

        <div className={styles.cards}>
          {principles.map((item, index) => (
            <article key={item.title} className={styles.card}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

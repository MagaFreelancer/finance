import { useState } from 'react'
import styles from './FAQ.module.css'

const faqs = [
  {
    q: 'Что такое исламская рассрочка?',
    a: 'Это способ финансирования покупки без начисления процентов. Стоимость и график платежей известны заранее и согласуются прозрачно.',
  },
  {
    q: 'Есть ли скрытые комиссии?',
    a: 'Нет. Калькулятор показывает стоимость покупки, срок и ежемесячный платёж. Итоговая сумма сделки равна стоимости покупки.',
  },
  {
    q: 'Как быстро рассматривают заявку?',
    a: 'Обычно мы связываемся в течение рабочего дня после отправки заявки, чтобы уточнить детали и сообщить решение.',
  },
  {
    q: 'Какие покупки можно оформить?',
    a: 'Технику, мебель, услуги и другие легальные покупки в рамках лимитов сервиса. Точные условия подтверждаются после заявки.',
  },
]

export function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="section" id="faq">
      <div className={`container ${styles.wrap}`}>
        <div className="section-head">
          <span className="section-eyebrow">FAQ</span>
          <h2 className="section-title">Частые вопросы</h2>
          <p className="section-subtitle">
            Коротко о главном — если останутся вопросы, напишите нам после заявки.
          </p>
        </div>

        <div className={styles.list}>
          {faqs.map((item, index) => {
            const isOpen = open === index
            return (
              <div
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.open : ''}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : index)}
                >
                  <span>{item.q}</span>
                  <span className={styles.plus} aria-hidden>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div className={styles.panel}>
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

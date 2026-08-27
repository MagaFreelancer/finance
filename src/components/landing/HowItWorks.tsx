import { Reveal } from '../ui/Reveal'
import styles from './HowItWorks.module.css'

const steps = [
  {
    n: '01',
    title: 'Выберите товар или услугу',
    text: 'Определите покупку и её стоимость — в магазине, онлайн или у партнёра.',
  },
  {
    n: '02',
    title: 'Рассчитайте рассрочку',
    text: 'Укажите сумму и удобный срок в калькуляторе — платёж обновится сразу.',
  },
  {
    n: '03',
    title: 'Отправьте заявку',
    text: 'Заполните короткую форму: товар, место покупки, ФИО и телефон.',
  },
  {
    n: '04',
    title: 'Получите решение',
    text: 'Мы свяжемся с вами и подтвердим условия финансирования.',
  },
]

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Процесс</span>
          <h2 className="section-title">Как это работает</h2>
          <p className="section-subtitle">
            Четыре понятных шага от расчёта до решения — без лишних форм и
            сложных условий.
          </p>
        </div>

        <ol className={styles.list}>
          {steps.map((step, index) => (
            <Reveal key={step.n} as="li" delay={index * 80} className={styles.item}>
              <div className={styles.num}>{step.n}</div>
              {index < steps.length - 1 && <div className={styles.line} />}
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

import { useI18n } from '../../i18n/I18nProvider'
import { HeroCharts } from './HeroCharts'
import styles from './Hero.module.css'

export function Hero() {
  const { dict } = useI18n()
  const t = dict.hero

  return (
    <section className={styles.hero} id="top">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h1>
            {t.title}
            <span>{t.titleAccent}</span>
          </h1>
          <p className={styles.lead}>{t.lead}</p>
          <div className={styles.actions}>
            <a href="#calculator" className="btn btn-primary">
              {t.cta}
            </a>
            <a href="#how" className="btn btn-secondary">
              {t.secondary}
            </a>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.orb} aria-hidden />
          <div className={styles.orbSoft} aria-hidden />
          <HeroCharts />
        </div>
      </div>
    </section>
  )
}

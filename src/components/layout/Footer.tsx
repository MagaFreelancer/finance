import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.mark} aria-hidden>
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
                <path
                  d="M8 22V10l8 5.5L24 10v12h-3.2V14.8L16 18.2l-4.8-3.4V22H8z"
                  fill="currentColor"
                />
              </svg>
            </span>
            Амана
          </div>
          <p>
            Прозрачное финансирование покупок в соответствии с принципами
            исламского финансирования.
          </p>
        </div>

        <div>
          <h4>Навигация</h4>
          <ul>
            <li>
              <a href="#about">О сервисе</a>
            </li>
            <li>
              <a href="#how">Как это работает</a>
            </li>
            <li>
              <a href="#calculator">Рассчитать</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>

        <div>
          <h4>Контакты</h4>
          <ul>
            <li>
              <a href="mailto:hello@amana.finance">hello@amana.finance</a>
            </li>
            <li>
              <a href="tel:+78005553535">+7 (800) 555-35-35</a>
            </li>
            <li>Ежедневно, 9:00–21:00</li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© 2026. Все права защищены.</span>
        <a href="/admin">Для партнёров</a>
      </div>
    </footer>
  )
}

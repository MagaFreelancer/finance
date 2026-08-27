import { useEffect, useState } from 'react'
import { useI18n } from '../../i18n/I18nProvider'
import { localeMeta } from '../../i18n/translations'
import styles from './Header.module.css'

export function Header() {
  const { dict, locale, setLocale } = useI18n()
  const t = dict.header
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#about', label: t.about },
    { href: '#how', label: t.how },
    { href: '#products', label: t.products },
    { href: '#principles', label: t.principles },
    { href: '#faq', label: t.faq },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  const langs = (
    <div className={styles.langs} role="group" aria-label={t.language}>
      {localeMeta.map((item) => (
        <button
          key={item.code}
          type="button"
          className={locale === item.code ? styles.langActive : styles.lang}
          aria-pressed={locale === item.code}
          onClick={() => setLocale(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" className={styles.logo} onClick={closeMenu}>
          <span className={styles.mark} aria-hidden>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 22V10l8 5.5L24 10v12h-3.2V14.8L16 18.2l-4.8-3.4V22H8z"
                fill="currentColor"
              />
            </svg>
          </span>
          {dict.brand}
        </a>

        <nav className={styles.nav} aria-label={t.navAria}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        {langs}

        <a href="#calculator" className={`btn btn-primary ${styles.cta}`}>
          {t.calculate}
        </a>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobile} ${open ? styles.mobileOpen : ''}`}>
        <nav aria-label={t.mobileAria}>
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#calculator" className="btn btn-primary" onClick={closeMenu}>
            {t.calculate}
          </a>
        </nav>
      </div>
    </header>
  )
}

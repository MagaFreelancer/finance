import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  dictionaries,
  localeMeta,
  type Dictionary,
  type Locale,
} from './translations'

const STORAGE_KEY = 'amana-locale'

interface I18nContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  bcp47: string
  dict: Dictionary
  setLocale: (locale: Locale) => void
}

const I18nContext = createContext<I18nContextValue | null>(null)

function isLocale(value: string | null): value is Locale {
  return value === 'ru' || value === 'en' || value === 'ar' || value === 'tr'
}

function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    // ignore
  }

  const lang = navigator.language.toLowerCase()
  if (lang.startsWith('ar')) return 'ar'
  if (lang.startsWith('tr')) return 'tr'
  if (lang.startsWith('en')) return 'en'
  return 'ru'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale)

  const meta = localeMeta.find((item) => item.code === locale) ?? localeMeta[0]
  const dict = dictionaries[locale]

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = meta.bcp47
    document.documentElement.dir = meta.dir
    document.title = dict.metaTitle

    const description = document.querySelector('meta[name="description"]')
    if (description) {
      description.setAttribute('content', dict.metaDescription)
    }
  }, [dict.metaDescription, dict.metaTitle, meta.bcp47, meta.dir])

  const value = useMemo(
    () => ({
      locale,
      dir: meta.dir,
      bcp47: meta.bcp47,
      dict,
      setLocale,
    }),
    [dict, locale, meta.bcp47, meta.dir, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

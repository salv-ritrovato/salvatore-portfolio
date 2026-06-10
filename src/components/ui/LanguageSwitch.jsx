import { useLanguage } from '../../i18n/LanguageContext'

/**
 * LanguageSwitch — toggle brutalist IT / EN
 */
export default function LanguageSwitch({ className = '' }) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.ui.languageSwitch}
      className={`inline-flex shrink-0 border-2 border-fg ${className}`.trim()}
    >
      {['it', 'en'].map((code) => {
        const active = locale === code
        const label = code === 'it' ? t.ui.langIt : t.ui.langEn
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={label}
            className={`min-w-[2.5rem] px-2.5 py-2 font-mono text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
              active
                ? 'bg-accent text-bg'
                : 'bg-bg text-muted hover:bg-surface hover:text-fg'
            }`}
          >
            {code.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

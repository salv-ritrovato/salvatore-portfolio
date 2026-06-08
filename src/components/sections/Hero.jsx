import { useEffect, useState } from 'react'
import { hero } from '../../data/portfolioData'
import Button from '../ui/Button'

// Prefisso fisso mostrato accanto al testo che ruota (es. "I am a React Enthusiast").
const ROLE_PREFIX = 'I am a'

/**
 * useTypingRotation
 * Effetto macchina da scrivere che cicla su una lista di stringhe.
 */
function useTypingRotation(words, { typeSpeed = 90, deleteSpeed = 45, hold = 1400 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!words.length) return
    const current = words[index % words.length]

    let timeout
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      const next = deleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1)
      timeout = setTimeout(() => setText(next), deleting ? deleteSpeed : typeSpeed)
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, hold])

  return text
}

export default function Hero() {
  const typed = useTypingRotation(hero.taglineRotation)
  const lines = hero.name.split('\n')

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
      {/* Animated background: accent blob + scanning line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute -right-24 top-1/4 h-[40vw] w-[40vw] max-w-[560px] max-h-[560px] rounded-full opacity-25 blur-3xl"
          style={{
            background: 'radial-gradient(circle, var(--color-accent), transparent 65%)',
            animation: 'float-blob 9s ease-in-out infinite',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </div>

      <div className="container-x relative z-10 w-full">
        <p className="mono-label mb-6 flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent" />
          {hero.index}
        </p>

        <p className="mb-3 font-mono text-base text-muted sm:text-lg">{hero.greeting}</p>

        {/* Glitch name */}
        <h1 className="font-display text-[clamp(2.75rem,11vw,9rem)] font-bold uppercase leading-[0.92]">
          {lines.map((line, i) => (
            <span key={i} className="block">
              <span className="glitch" data-text={line}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* Typing rotation */}
        <div className="mt-6 flex items-center gap-3">
          <span className="grid place-items-center border-2 border-accent px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest text-accent">
            {ROLE_PREFIX}
          </span>
          <span className="font-mono text-xl text-fg sm:text-2xl">
            {typed}
            <span className="caret">&nbsp;</span>
          </span>
        </div>

        <p className="mt-8 max-w-xl font-mono text-base text-muted sm:text-lg">
          {hero.description}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {hero.ctas.map((cta) => (
            <Button key={cta.id} href={cta.href} variant={cta.variant} size="lg">
              {cta.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom marquee strip */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y-2 border-line/20 bg-bg/40 py-3 backdrop-blur-sm">
        <div className="marquee-track">
          {[...hero.marquee, ...hero.marquee].map((item, i) => (
            <span
              key={i}
              className="mx-6 font-mono text-sm font-bold uppercase tracking-[0.3em] text-muted"
            >
              {item}
              <span className="ml-12 text-accent">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

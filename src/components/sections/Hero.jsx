import { useEffect, useState, useRef, useCallback } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import Button from '../ui/Button'

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

const SCRAMBLE_CHARS = '!@#$%<>[]{}|\\/01ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function useScramble(original, { speed = 35, step = 2 } = {}) {
  const [display, setDisplay] = useState(original)
  const active = useRef(false)
  const intervalRef = useRef(null)

  const scramble = useCallback(() => {
    if (active.current) return
    active.current = true
    let iteration = 0
    const len = original.replace(/\s/g, '').length

    intervalRef.current = setInterval(() => {
      let charIdx = 0
      setDisplay(
        original
          .split('')
          .map((char) => {
            if (char === ' ' || char === '\n') return char
            const resolved = charIdx < iteration
            charIdx++
            if (resolved) return original.split('').filter((c) => c !== ' ' && c !== '\n')[charIdx - 1] ?? char
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          })
          .join('')
      )
      iteration += step
      if (iteration > len + step) {
        clearInterval(intervalRef.current)
        setDisplay(original)
        active.current = false
      }
    }, speed)
  }, [original, speed, step])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return { display, scramble }
}

export default function Hero() {
  const { t } = useLanguage()
  const { hero } = t
  const typed = useTypingRotation(hero.taglineRotation)
  const lines = hero.name.split('\n')

  const scrambles = lines.map((line) => useScramble(line))

  const handleNameHover = () => scrambles.forEach((s) => s.scramble())

  return (
    <section id="home" className="hero-grain relative flex min-h-screen items-center overflow-hidden pt-28 pb-16">
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

        <h1
          className="font-display text-[clamp(2.75rem,11vw,9rem)] font-bold uppercase leading-[0.92] cursor-default select-none"
          onMouseEnter={handleNameHover}
        >
          {lines.map((line, i) => (
            <span key={i} className="block">
              <span className="glitch" data-text={line}>
                {scrambles[i].display}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-6 flex items-center gap-3">
          <span className="grid place-items-center border-2 border-accent px-3 py-1 font-mono text-sm font-bold uppercase tracking-widest text-accent">
            {hero.rolePrefix}
          </span>
          <span className="font-mono text-xl text-fg sm:text-2xl">
            {typed}
            <span className="caret">&nbsp;</span>
          </span>
        </div>

        <p className="mt-8 max-w-xl font-mono text-base text-muted sm:text-lg">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          {hero.ctas.map((cta) => (
            <Button
              key={cta.id}
              href={cta.href}
              variant={cta.variant}
              size="lg"
              {...(cta.download ? { download: true, target: '_blank', rel: 'noreferrer' } : {})}
            >
              {cta.label}
            </Button>
          ))}
        </div>
      </div>

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

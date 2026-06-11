import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitch from '../ui/LanguageSwitch'

const DESKTOP_BP = '(min-width: 1024px)'

export default function Navbar() {
  const { t } = useLanguage()
  const { nav, ui } = t

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(nav.links[0]?.id)
  const scrollLockY = useRef(0)
  const skipScrollRestore = useRef(false)

  const closeMenu = () => setOpen(false)

  const restoreScrollInstant = (y) => {
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = 'auto'
    window.scrollTo(0, y)
    html.style.scrollBehavior = prev
  }

  const unlockBody = (restoreScroll = true) => {
    const y = scrollLockY.current
    const { style } = document.body
    style.position = ''
    style.top = ''
    style.left = ''
    style.right = ''
    style.overflow = ''
    if (restoreScroll && !skipScrollRestore.current) {
      restoreScrollInstant(y)
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_BP)
    const onChange = (e) => {
      if (e.matches) closeMenu()
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (open) return

    const sections = nav.links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [open, nav.links])

  useEffect(() => {
    if (!open) return

    scrollLockY.current = window.scrollY
    const { style } = document.body
    style.position = 'fixed'
    style.top = `-${scrollLockY.current}px`
    style.left = '0'
    style.right = '0'
    style.overflow = 'hidden'

    return () => unlockBody()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeMenu()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const goTo = (e, href) => {
    e.preventDefault()
    const id = href.replace('#', '')
    const target = document.getElementById(id)
    const y = scrollLockY.current

    skipScrollRestore.current = true
    closeMenu()
    unlockBody(false)
    restoreScrollInstant(y)

    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth' })
        history.pushState(null, '', href)
        skipScrollRestore.current = false
      })
    } else {
      window.location.hash = href
      skipScrollRestore.current = false
    }
  }

  const mobileMenu = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={ui.navDialog}
      aria-hidden={!open}
      className={`fixed inset-x-0 bottom-0 top-16 z-[90] flex flex-col border-t-2 border-line/20 bg-bg transition-opacity duration-300 lg:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <nav className="flex flex-1 flex-col justify-start overflow-y-auto px-[var(--gutter)] pb-8 pt-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <p className="mono-label text-muted">{ui.navigation}</p>
          <LanguageSwitch />
        </div>
        <ul className="flex flex-col gap-6">
          {nav.links.map((link, i) => (
            <li key={link.id}>
              <a
                href={link.href}
                onClick={(e) => goTo(e, link.href)}
                className="font-display text-3xl font-bold uppercase text-fg transition-colors duration-200 hover:text-accent sm:text-4xl"
              >
                <span className="mono-label mr-3 align-middle">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={nav.cta.href}
          onClick={(e) => goTo(e, nav.cta.href)}
          className="mt-10 inline-block w-full border-2 border-accent bg-accent px-6 py-4 text-center font-mono font-bold uppercase tracking-widest text-bg"
        >
          {nav.cta.label}
        </a>
      </nav>
    </div>
  )

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ease-[var(--ease-brutal)] ${
          open || scrolled
            ? 'border-b-2 border-line/30 bg-bg py-3'
            : 'border-b-2 border-transparent bg-transparent py-5'
        } ${scrolled && !open ? 'backdrop-blur-md bg-bg/90' : ''}`}
      >
        <nav className="container-x flex items-center justify-between gap-3 sm:gap-4">
          <a
            href="#home"
            onClick={(e) => {
              if (open) goTo(e, '#home')
            }}
            className="group flex shrink-0 items-center gap-2 font-display text-xl font-bold tracking-tight"
          >
            <span className="grid h-9 w-9 place-items-center border-2 border-fg transition-colors duration-200 group-hover:border-accent group-hover:text-accent">
              {nav.brand}
            </span>
            <span className="hidden sm:inline">/portfolio</span>
          </a>

          <ul className="hidden items-center gap-6 lg:flex xl:gap-8">
            {nav.links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`relative whitespace-nowrap font-mono text-sm uppercase tracking-widest transition-colors duration-200 hover:text-accent ${
                    active === link.id ? 'text-accent' : 'text-muted'
                  }`}
                >
                  <span
                    className={`mr-1 transition-opacity ${
                      active === link.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    ▸
                  </span>
                  <span className="nav-glitch" data-text={link.label}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <LanguageSwitch />

            <a
              href={nav.cta.href}
              className="hidden shrink-0 border-2 border-accent bg-accent px-5 py-2 font-mono text-sm font-bold uppercase tracking-widest text-bg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-brutal-sm lg:inline-block"
            >
              {nav.cta.label}
            </a>

            <button
              type="button"
              aria-label={open ? ui.closeMenu : ui.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`relative flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-[5px] border-2 bg-bg transition-all duration-200 ease-[var(--ease-brutal)] lg:hidden ${
                open
                  ? 'border-accent text-accent'
                  : 'border-fg text-fg hover:border-accent hover:text-accent'
              }`}
            >
              <span
                aria-hidden="true"
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ease-[var(--ease-brutal)] ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ease-[var(--ease-brutal)] ${
                  open ? 'scale-x-0 opacity-0' : ''
                }`}
              />
              <span
                aria-hidden="true"
                className={`block h-[2px] w-5 bg-current transition-all duration-300 ease-[var(--ease-brutal)] ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {createPortal(mobileMenu, document.body)}
    </>
  )
}

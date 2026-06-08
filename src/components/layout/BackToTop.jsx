import { useEffect, useState } from 'react'

/**
 * BackToTop
 * Pulsante che compare dopo lo scroll e riporta in cima con smooth scroll.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Torna su"
      className={`fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center border-2 border-fg bg-bg text-fg transition-all duration-300 ease-[var(--ease-brutal)] hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-bg hover:shadow-brutal-sm ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <span className="text-lg leading-none">↑</span>
    </button>
  )
}

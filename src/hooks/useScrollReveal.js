import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal
 * Hook riutilizzabile basato su Intersection Observer.
 * Restituisce una ref da agganciare a un elemento e un booleano
 * `isVisible` che diventa true quando l'elemento entra nel viewport.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.15] - quanta parte deve essere visibile
 * @param {string} [options.rootMargin='0px 0px -10% 0px'] - margine del root
 * @param {boolean} [options.once=true] - se true, smette di osservare dopo la prima volta
 * @returns {[React.RefObject, boolean]}
 */
export function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
  once = true,
} = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Fallback: se l'API non esiste, mostra subito.
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            setIsVisible(false)
          }
        })
      },
      { threshold, rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}

export default useScrollReveal

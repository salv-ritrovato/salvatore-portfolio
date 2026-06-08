import { useEffect, useRef } from 'react'

/**
 * AnimatedCursor
 * Cursore custom brutalist: un dot che segue il mouse 1:1 e un anello
 * che lo insegue con easing. Si ingrandisce sugli elementi interattivi.
 *
 * - Attivo solo su dispositivi con puntatore fine (hover: hover).
 * - Nessuna libreria esterna: requestAnimationFrame + listener nativi.
 */
export default function AnimatedCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine =
      window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-custom-cursor')

    // Posizioni: target (mouse) e correnti (anello con easing)
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    let rafId

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`
    }

    const render = () => {
      // Lerp per l'anello → effetto trascinamento
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`
      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    const interactiveSelector = 'a, button, input, textarea, select, [data-cursor="hover"]'
    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) ring.classList.add('is-hovering')
    }
    const onOut = (e) => {
      if (e.target.closest(interactiveSelector)) ring.classList.remove('is-hovering')
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

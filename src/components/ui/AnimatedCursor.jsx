import { useEffect, useRef, useState } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'
const TRAIL_COUNT = 6

export default function AnimatedCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const arrowRef = useRef(null)
  const trailRefs = useRef([])
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(FINE_POINTER).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER)
    const onChange = (e) => setEnabled(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const dot = dotRef.current
    const ring = ringRef.current
    const arrow = arrowRef.current
    const trails = trailRefs.current
    if (!dot || !ring || !arrow) return

    document.body.classList.add('has-custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    const trailPositions = Array.from({ length: TRAIL_COUNT }, () => ({ ...mouse }))
    let rafId
    let isLink = false

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px) translate(-50%, -50%)`
    }

    const render = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.18
      ringPos.y += (mouse.y - ringPos.y) * 0.18
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`

      if (isLink) {
        arrow.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`
      }

      trailPositions.forEach((pos, i) => {
        const target = i === 0 ? mouse : trailPositions[i - 1]
        pos.x += (target.x - pos.x) * (0.25 - i * 0.03)
        pos.y += (target.y - pos.y) * (0.25 - i * 0.03)
        const el = trails[i]
        if (el) {
          el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
        }
      })

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    const onOver = (e) => {
      const link = e.target.closest('a')
      const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor="hover"]')
      if (link) {
        isLink = true
        ring.classList.add('is-link')
        arrow.classList.add('visible')
        trails.forEach((t) => t && (t.style.opacity = '0.5'))
      } else if (interactive) {
        ring.classList.add('is-hovering')
      }
    }

    const onOut = (e) => {
      const link = e.target.closest('a')
      const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor="hover"]')
      if (link) {
        isLink = false
        ring.classList.remove('is-link')
        arrow.classList.remove('visible')
        trails.forEach((t) => t && (t.style.opacity = '0'))
      } else if (interactive) {
        ring.classList.remove('is-hovering')
      }
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      arrow.style.opacity = '0'
      trails.forEach((t) => t && (t.style.opacity = '0'))
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
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="cursor-trail"
          aria-hidden="true"
          style={{ opacity: 0, width: `${5 - i * 0.5}px`, height: `${5 - i * 0.5}px` }}
        />
      ))}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={arrowRef} className="cursor-arrow" aria-hidden="true">→</div>
    </>
  )
}

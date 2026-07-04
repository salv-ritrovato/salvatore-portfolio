import { useEffect, useRef, useState } from 'react'

const FINE_POINTER = '(hover: hover) and (pointer: fine)'

const ARROW_PATH = 'M2,2 L2,18.5 L6.3,14.8 L9.2,21.2 L12.1,19.9 L9.2,13.5 L15,13.5 Z'

function ArrowSvg() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="currentColor">
      <path d={ARROW_PATH} />
    </svg>
  )
}

export default function AnimatedCursor() {
  const mainRef = useRef(null)
  const ghostRRef = useRef(null)
  const ghostCRef = useRef(null)
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

    const main = mainRef.current
    const ghostR = ghostRRef.current
    const ghostC = ghostCRef.current
    if (!main || !ghostR || !ghostC) return

    document.body.classList.add('has-custom-cursor')

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const last = { ...mouse }
    let velocity = { x: 0, y: 0 }
    let glitch = 0
    let rafId

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const render = () => {
      velocity.x = mouse.x - last.x
      velocity.y = mouse.y - last.y
      last.x = mouse.x
      last.y = mouse.y

      const speed = Math.min(Math.hypot(velocity.x, velocity.y), 60)
      glitch += (speed - glitch) * 0.35

      main.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`

      const offX = -velocity.x * 0.5
      const offY = -velocity.y * 0.5
      ghostR.style.transform = `translate(${mouse.x + offX}px, ${mouse.y + offY}px)`
      ghostC.style.transform = `translate(${mouse.x - offX}px, ${mouse.y - offY}px)`
      const opacity = Math.min(glitch / 22, 0.85)
      ghostR.style.opacity = opacity
      ghostC.style.opacity = opacity

      rafId = requestAnimationFrame(render)
    }
    rafId = requestAnimationFrame(render)

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor="hover"]')
      if (interactive) main.classList.add('is-hovering')
    }
    const onOut = (e) => {
      const interactive = e.target.closest('a, button, input, textarea, select, [data-cursor="hover"]')
      if (interactive) main.classList.remove('is-hovering')
    }

    const onLeave = () => {
      main.style.opacity = '0'
      ghostR.style.opacity = '0'
      ghostC.style.opacity = '0'
    }
    const onEnter = () => {
      main.style.opacity = '1'
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
      <div ref={ghostCRef} className="cursor-arrow-glitch cursor-arrow-cyan" aria-hidden="true">
        <ArrowSvg />
      </div>
      <div ref={ghostRRef} className="cursor-arrow-glitch cursor-arrow-red" aria-hidden="true">
        <ArrowSvg />
      </div>
      <div ref={mainRef} className="cursor-arrow-main" aria-hidden="true">
        <ArrowSvg />
      </div>
    </>
  )
}

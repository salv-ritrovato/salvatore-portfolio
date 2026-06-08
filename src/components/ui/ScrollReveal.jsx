import { useScrollReveal } from '../../hooks/useScrollReveal'

/**
 * ScrollReveal
 * Wrapper dichiarativo per rivelare i figli quando entrano nel viewport.
 * Usa il classico pattern `.reveal` / `.is-visible` definito in index.css.
 *
 * Props:
 * - as:        elemento/Componente da renderizzare (default 'div')
 * - delay:     ritardo in ms per lo stagger
 * - className: classi extra
 * - once:      osserva una sola volta (default true)
 * - threshold: soglia IntersectionObserver
 */
export default function ScrollReveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  once = true,
  threshold = 0.15,
  style,
  children,
  ...rest
}) {
  const [ref, isVisible] = useScrollReveal({ once, threshold })

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

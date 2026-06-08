/**
 * Tag
 * Etichetta/chip brutalist per tech stack e categorie.
 *
 * Props:
 * - children: contenuto
 * - active:   stile evidenziato (accent)
 * - size:     'sm' | 'md' (default 'sm')
 */
export default function Tag({ children, active = false, size = 'sm', className = '' }) {
  const sizes = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
  }

  const tone = active
    ? 'border-accent text-accent'
    : 'border-line/40 text-muted hover:border-accent hover:text-accent'

  return (
    <span
      className={`inline-flex items-center font-mono font-bold uppercase tracking-wider border-2 ${sizes[size]} ${tone} transition-colors duration-200 ${className}`.trim()}
    >
      {children}
    </span>
  )
}

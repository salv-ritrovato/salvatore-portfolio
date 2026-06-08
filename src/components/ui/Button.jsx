/**
 * Button
 * Bottone/anchor brutalist riutilizzabile.
 * Renderizza un <a> se viene passato `href`, altrimenti un <button>.
 *
 * Props:
 * - variant: 'primary' | 'ghost' | 'accent' (default 'primary')
 * - size:    'md' | 'lg' (default 'md')
 * - href:    se presente, renderizza un link
 * - as:      override esplicito del tag
 */
const VARIANTS = {
  primary:
    'bg-fg text-bg border-fg hover:bg-accent hover:border-accent hover:text-bg',
  ghost:
    'bg-transparent text-fg border-fg hover:bg-fg hover:text-bg',
  accent:
    'bg-accent text-bg border-accent hover:bg-transparent hover:text-accent',
}

const SIZES = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  as,
  className = '',
  ...rest
}) {
  const Tag = as || (href ? 'a' : 'button')

  const base =
    'group relative inline-flex items-center justify-center gap-3 ' +
    'font-mono font-bold uppercase tracking-widest border-2 ' +
    'transition-all duration-200 ease-[var(--ease-brutal)] ' +
    'hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-accent ' +
    'active:translate-x-0 active:translate-y-0 active:shadow-none'

  return (
    <Tag
      href={href}
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`.trim()}
      {...rest}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="relative z-10 inline-block transition-transform duration-200 group-hover:translate-x-1"
      >
        →
      </span>
    </Tag>
  )
}

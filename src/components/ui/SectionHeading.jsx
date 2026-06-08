import ScrollReveal from './ScrollReveal'

/**
 * SectionHeading
 * Intestazione di sezione coerente in tutto il sito.
 *
 * Props:
 * - index:       etichetta mono (es. "03 / SKILLS")
 * - title:       titolo grande
 * - description: testo opzionale sotto il titolo
 * - align:       'left' | 'center' (default 'left')
 */
export default function SectionHeading({
  index,
  title,
  description,
  align = 'left',
}) {
  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <header className={`flex flex-col ${alignment} max-w-3xl gap-4`}>
      {index && (
        <ScrollReveal as="span" className="mono-label flex items-center gap-3">
          <span className="inline-block h-px w-10 bg-accent align-middle" />
          {index}
        </ScrollReveal>
      )}

      <ScrollReveal
        as="h2"
        delay={80}
        className="text-4xl sm:text-5xl lg:text-6xl font-display uppercase"
      >
        {title}
      </ScrollReveal>

      {description && (
        <ScrollReveal
          as="p"
          delay={160}
          className="text-muted text-base sm:text-lg max-w-xl"
        >
          {description}
        </ScrollReveal>
      )}
    </header>
  )
}

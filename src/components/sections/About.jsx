import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'

export default function About() {
  const { t } = useLanguage()
  const { about, site } = t

  return (
    <section id="about" className="relative z-10 border-t-2 border-line/20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index={about.index} title={about.heading} />

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <ScrollReveal className="lg:col-span-5">
            <div className="group relative">
              <div className="absolute inset-0 translate-x-3 translate-y-3 border-2 border-accent transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-fg bg-surface">
                {about.photo ? (
                  <img
                    src={about.photo}
                    alt={about.photoAlt}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    <span className="font-display text-7xl font-bold text-line/20">
                      {site.initials}
                    </span>
                    <span className="mono-label text-muted">[ photo placeholder ]</span>
                  </div>
                )}
              </div>
              <span className="absolute bottom-4 left-4 z-10 bg-bg/80 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent backdrop-blur">
                {site.role}
              </span>
            </div>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-5">
              {about.paragraphs.map((p, i) => (
                <ScrollReveal as="p" key={i} delay={i * 100} className="text-base leading-relaxed text-fg/85 sm:text-lg">
                  {p}
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-10 grid gap-px border-2 border-line/30 bg-line/30 sm:grid-cols-3">
              {about.highlights.map((h, i) => (
                <ScrollReveal key={h.id} delay={i * 120} className="bg-bg p-5">
                  <p className="mono-label mb-2">{h.label}</p>
                  <p className="font-display text-lg font-bold">{h.value}</p>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
              {about.stats.map((s, i) => (
                <ScrollReveal key={s.id} delay={i * 120} className="flex items-baseline gap-2">
                  <span className="font-display text-4xl font-bold text-accent">{s.value}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {s.label}
                  </span>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

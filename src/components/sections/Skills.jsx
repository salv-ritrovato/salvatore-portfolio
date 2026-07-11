import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'

const GROUP_ORDER = ['frontend', 'backend', 'tools', 'ai']

export default function Skills() {
  const { t } = useLanguage()
  const { skills } = t

  const groups = GROUP_ORDER.map((key) => ({
    key,
    label: skills.groupLabels[key],
    items: skills.items.filter((skill) => skill.group === key),
  })).filter((group) => group.items.length > 0)

  return (
    <section id="skills" className="relative z-10 border-t-2 border-line/20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index={skills.index} title={skills.heading} description={skills.description} />

        <div className="mt-16 flex flex-col gap-10">
          {groups.map((group, gi) => (
            <div key={group.key}>
              <ScrollReveal
                as="p"
                delay={gi * 60}
                className="mono-label flex items-center gap-3"
              >
                <span className="inline-block h-px w-6 bg-accent align-middle" />
                {group.label}
              </ScrollReveal>

              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map((skill, i) => (
                  <ScrollReveal
                    key={skill.id}
                    delay={gi * 60 + i * 40}
                    data-cursor="hover"
                    className="group inline-flex cursor-none items-center gap-2.5 border-2 border-line/40 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
                  >
                    <span className="font-mono text-xs font-bold text-accent transition-colors duration-300 group-hover:text-fg">
                      {skill.glyph}
                    </span>
                    <span className="font-display text-sm font-bold uppercase tracking-wide">
                      {skill.name}
                    </span>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        {skills.learningItems?.length > 0 && (
          <div className="mt-12">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-muted">
              {skills.learningHeading}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {skills.learningItems.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-2 border-2 border-dashed border-line/40 px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider text-muted"
                >
                  <span aria-hidden="true">{skill.glyph}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

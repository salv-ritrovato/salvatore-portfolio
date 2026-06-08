import { skills } from '../../data/portfolioData'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import Tag from '../ui/Tag'

/**
 * Skills
 * Griglia di tecnologie con badge brutalist. Ogni card ha un hover
 * effect (slide del glyph, barra di "padronanza" che si riempie).
 */
export default function Skills() {
  return (
    <section id="skills" className="relative z-10 border-t-2 border-line/20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading index={skills.index} title={skills.heading} description={skills.description} />

        <div className="mt-16 grid grid-cols-2 gap-px border-2 border-line/30 bg-line/30 sm:grid-cols-3 lg:grid-cols-4">
          {skills.items.map((skill, i) => (
            <ScrollReveal
              key={skill.id}
              delay={(i % 4) * 80}
              data-cursor="hover"
              className="group relative cursor-none overflow-hidden bg-bg p-6 transition-colors duration-300 hover:bg-surface"
            >
              {/* Accent corner */}
              <span className="absolute right-0 top-0 h-0 w-0 border-l-[28px] border-t-[28px] border-l-transparent border-t-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mb-6 flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center border-2 border-line/40 font-display text-lg font-bold transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent group-hover:text-accent">
                  {skill.glyph}
                </span>
                <Tag>{skill.category}</Tag>
              </div>

              <h3 className="font-display text-xl font-bold uppercase">{skill.name}</h3>

              {/* Proficiency bar */}
              <div className="mt-4 h-1.5 w-full bg-line/20">
                <span
                  className="block h-full origin-left bg-accent transition-transform duration-700 ease-[var(--ease-brutal)]"
                  style={{
                    transform: `scaleX(${skill.level / 100})`,
                  }}
                />
              </div>
              <span className="mt-2 block font-mono text-xs text-muted">{skill.level}%</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

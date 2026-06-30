import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import Tag from '../ui/Tag'

function ProjectCard({ project, delay, ui, featured = false }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const intensity = featured ? 6 : 12
    el.style.setProperty('--rx', `${(0.5 - py) * intensity}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * intensity}deg`)
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <ScrollReveal
      delay={delay}
      className={`[perspective:1200px] ${featured ? 'md:col-span-2' : ''}`}
    >
      <article
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`group relative flex h-full flex-col border-2 border-line/40 bg-surface transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-brutal-accent ${
          featured ? 'p-7 sm:p-10' : 'p-7'
        }`}
        style={{
          transform: 'rotateX(var(--rx,0)) rotateY(var(--ry,0))',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(204,255,0,0.12), transparent 45%)',
          }}
        />

        {featured ? (
          /* ---------- FEATURED: due colonne di testo, niente preview ---------- */
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            {/* Colonna identità */}
            <div style={{ transform: 'translateZ(30px)' }}>
              <div className="mb-5 flex items-center gap-4">
                <span className="font-display text-6xl font-bold leading-none text-accent">
                  {project.number}
                </span>
                <span className="border-2 border-accent px-2 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-accent">
                  {ui.featuredLabel}
                </span>
              </div>
              <h3 className="font-display text-3xl font-bold uppercase leading-tight sm:text-4xl">
                {project.title}
              </h3>
            </div>

            {/* Colonna contenuto */}
            <div className="flex flex-col" style={{ transform: 'translateZ(20px)' }}>
              <p className="text-sm leading-relaxed text-muted sm:text-base">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <Tag key={tech}>{tech}</Tag>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-5">
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-fg transition-colors hover:text-accent"
                >
                  {ui.viewProject}
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* ---------- CARD NORMALE (invariata) ---------- */
          <>
            <div className="mb-6" style={{ transform: 'translateZ(40px)' }}>
              <span className="font-display text-5xl font-bold text-line/20 transition-colors duration-300 group-hover:text-accent">
                {project.number}
              </span>
            </div>

            <h3 className="font-display text-2xl font-bold uppercase" style={{ transform: 'translateZ(30px)' }}>
              {project.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted" style={{ transform: 'translateZ(20px)' }}>
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2" style={{ transform: 'translateZ(25px)' }}>
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>

            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-fg transition-colors hover:text-accent"
              style={{ transform: 'translateZ(35px)' }}
            >
              {ui.viewProject}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </>
        )}
      </article>
    </ScrollReveal>
  )
}

export default function Projects() {
  const { t } = useLanguage()
  const { projects, ui } = t

  return (
    <section id="projects" className="relative z-10 border-t-2 border-line/20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          index={projects.index}
          title={projects.heading}
          description={projects.description}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {projects.items.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={project.featured ? 0 : (i % 2) * 120}
              ui={ui}
              featured={Boolean(project.featured)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
import { useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import Tag from '../ui/Tag'

function ProjectCard({ project, delay, ui }) {
  const cardRef = useRef(null)

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 12
    const rotateX = (0.5 - py) * 12
    el.style.setProperty('--rx', `${rotateX}deg`)
    el.style.setProperty('--ry', `${rotateY}deg`)
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
    <ScrollReveal delay={delay} className="[perspective:1200px]">
      <article
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className="group relative flex h-full flex-col border-2 border-line/40 bg-surface p-7 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-brutal-accent"
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

        <div className="mb-6 flex items-start justify-between" style={{ transform: 'translateZ(40px)' }}>
          <span className="font-display text-5xl font-bold text-line/20 transition-colors duration-300 group-hover:text-accent">
            {project.number}
          </span>
          <div className="flex gap-2">
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={ui.projectOnGithub(project.title)}
              className="grid h-10 w-10 place-items-center border-2 border-line/40 font-mono text-xs font-bold transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              GH
            </a>
            <a
              href={project.links.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={ui.projectDemo(project.title)}
              className="grid h-10 w-10 place-items-center border-2 border-line/40 transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              ↗
            </a>
          </div>
        </div>

        <h3
          className="font-display text-2xl font-bold uppercase"
          style={{ transform: 'translateZ(30px)' }}
        >
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
            <ProjectCard key={project.id} project={project} delay={(i % 2) * 120} ui={ui} />
          ))}
        </div>
      </div>
    </section>
  )
}

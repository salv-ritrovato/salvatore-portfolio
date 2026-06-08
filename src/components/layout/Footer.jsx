import { site, nav, socials, footer } from '../../data/portfolioData'

/**
 * Footer
 * Chiusura del sito: brand, navigazione rapida, social e copyright.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-line/30 bg-surface">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-5">
            <a href="#home" className="font-display text-3xl font-bold uppercase">
              {site.name}
            </a>
            <p className="mt-4 max-w-sm text-muted">{footer.tagline}</p>
            <p className="mono-label mt-6 flex items-center gap-2 text-accent">
              <span className="inline-block h-2 w-2 animate-pulse bg-accent" />
              {site.availability}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h3 className="mono-label mb-4 text-muted">Naviga</h3>
            <ul className="flex flex-col gap-2">
              {nav.links.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="font-mono text-sm uppercase tracking-wider text-fg transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div className="md:col-span-4">
            <h3 className="mono-label mb-4 text-muted">Collegati</h3>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between border-b-2 border-line/15 pb-2 transition-colors hover:border-accent"
                  >
                    <span className="font-mono text-sm uppercase tracking-wider">{s.label}</span>
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                      {s.handle} ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t-2 border-line/15 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-muted">{footer.copyright}</p>
          <p className="font-mono text-xs text-muted">
            Built with{' '}
            {footer.builtWith.map((b, i) => (
              <span key={b}>
                <span className="text-accent">{b}</span>
                {i < footer.builtWith.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}

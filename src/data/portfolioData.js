// ============================================================
// portfolioData.js
// Single source of truth: tutte le stringhe, i progetti, le skill
// e i link del sito. I componenti NON contengono dati hardcoded.
// ============================================================

export const site = {
  name: 'Salvatore Ritrovato',
  initials: 'SR',
  role: 'Web Developer',
  location: 'Italia',
  email: 'salv.ritrovato@gmail.com',
  availability: 'Disponibile per nuovi progetti',
}

export const nav = {
  brand: 'SR',
  links: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'Chi sono', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Progetti', href: '#projects' },
    { id: 'contact', label: 'Contatti', href: '#contact' },
  ],
  cta: { label: 'Contattami', href: '#contact' },
}

export const hero = {
  index: '01 / HOME',
  greeting: 'Ciao, sono',
  name: 'SALVATORE\nRITROVATO',
  // Frasi che si alternano dopo il nome (effetto typing)
  taglineRotation: [
    'Web Developer',
    'React Enthusiast',
    'Pixel Perfectionist',
    'Performance Nerd',
  ],
  description:
    'Costruisco interfacce reattive, pulite e completamente responsive con React e Node. Ossessionato dai dettagli, dall’UX e dalle performance web.',
  marquee: [
    'HTML5',
    'CSS3',
    'JAVASCRIPT',
    'REACT',
    'NODE.JS',
    'EXPRESS',
    'MYSQL',
    'GIT',
    'UI / UX',
    'PERFORMANCE',
  ],
  ctas: [
    { id: 'projects', label: 'I miei progetti', href: '#projects', variant: 'primary' },
    { id: 'contact', label: 'Contattami', href: '#contact', variant: 'ghost' },
  ],
}

export const about = {
  index: '02 / ABOUT',
  heading: 'Chi sono',
  // Foto reale in /public/img — i path da /public sono serviti dalla root.
  photo: '/img/FotoCV.png',
  photoAlt: 'Salvatore Ritrovato',
  paragraphs: [
    'Sono un Web Developer focalizzato sul front-end moderno. Trasformo idee e mockup in prodotti digitali rapidi, accessibili e piacevoli da usare.',
    'La mia ossessione? L’incontro tra design e ingegneria: micro-interazioni curate, layout responsive impeccabili e codice ottimizzato per performance fulminee.',
    'Sviluppo applicazioni Full Stack con l’ecosistema JavaScript — React per l’interfaccia, Node ed Express sul back-end, MySQL per i dati — gestendo l’intero ciclo di sviluppo con Git e npm.',
    'Attualmente disponibile per progetti freelance e opportunità full-time in team che puntano alla qualità.'
  ],
  highlights: [
    { id: 'uiux', label: 'UI / UX', value: 'Design centrato sull’utente' },
    { id: 'responsive', label: 'Responsive', value: 'Mobile-first, sempre' },
    { id: 'perf', label: 'Performance', value: 'Ogni millisecondo conta' },
  ],
  stats: [
    { id: 'projects', value: '2', label: 'Progetti' },
    { id: 'tech', value: '12', label: 'Tools & Tecnologie' },
    { id: 'coffee', value: '∞', label: 'Caffè / mese' },
  ],
}

export const skills = {
  index: '03 / SKILLS',
  heading: 'Stack & strumenti',
  description: 'Le tecnologie con cui lavoro ogni giorno.',
  // glyph = etichetta compatta mostrata nel badge brutalist
  items: [
    { id: 'html', name: 'HTML5', glyph: '</>', category: 'Markup', level: 90 },
    { id: 'css', name: 'CSS3', glyph: '#', category: 'Style', level: 87 },
    { id: 'js', name: 'JavaScript', glyph: 'JS', category: 'Language', level: 72 },
    { id: 'react', name: 'React.js', glyph: '⚛', category: 'Framework', level: 68 },
    { id: 'node', name: 'Node.js', glyph: 'N', category: 'Runtime', level: 60 },
    { id: 'express', name: 'Express.js', glyph: 'Ex', category: 'Backend', level: 58 },
    { id: 'mysql', name: 'MySQL', glyph: 'DB', category: 'Database', level: 55 },
    { id: 'git', name: 'Git', glyph: '⎇', category: 'VCS', level: 75 },
    { id: 'github', name: 'GitHub', glyph: 'GH', category: 'Platform', level: 75 },
    { id: 'npm', name: 'npm', glyph: 'np', category: 'Tooling', level: 78 },
    { id: 'vscode', name: 'VS Code', glyph: '{ }', category: 'Editor', level: 92 },
    { id: 'cursor', name: 'Cursor', glyph: '▸', category: 'Editor', level: 75 },
  ],
}

export const projects = {
  index: '04 / WORK',
  heading: 'Progetti selezionati',
  description: 'Una selezione di lavori. Altri sul mio GitHub.',
  items: [
    {
      id: 'p1',
      number: '01',
      title: 'Gamify (beta)',
      description:
        "Gamify è una web application e-commerce responsive dedicata alla vendita di chiavi digitali per videogiochi. Focalizzata su una UX fluida e dinamica (senza ricaricamenti di pagina), garantisce la massima sicurezza per l'utente finale mantenendo gli ID dei prodotti completamente nascosti.",
      tech: ['React', 'JavaScript', 'Bootstrap', 'CSS3', 'Node.js', 'Express', 'MySQL'],
      links: {
        github: 'https://github.com/salvatore-ritrovato',
        demo: 'https://6a21e1f66141755033cc609c--incandescent-seahorse-3f6bb5.netlify.app/',
      },
    },
    {
      id: 'p2',
      number: '02',
      title: 'Fitness Gym Mario Tirone',
      description:
        "Si tratta di un sito showcase per una realtà del bodybuilding nella città di Sulmona (AQ), completamente fruibile da ogni dispositivo e sviluppato in React. Focalizzato su un design d'impatto ed un'esperienza utente fluida, la piattaforma presenta in modo dinamico i servizi, il fondatore e le attrezzature del centro, ottimizzando la conversione dei nuovi iscritti.",
      tech: ['React', 'JavaScript', 'Tailwind', 'CSS3'],
      links: {
        github: 'https://github.com/salvatore-ritrovato',
        demo: 'https://fitness-gym-tirone.vercel.app/',
      },
    },
    {
      id: 'p3',
      number: '03',
      title: 'Studio Dentistico Ferraro',
      description:
        "Soluzione web responsive in React per uno studio dentistico, che unisce un sito showcase tradizionale a un sistema di prenotazione visite in tempo reale. La piattaforma digitalizza la gestione dello studio e il rapporto con il paziente, offrendo una presentazione dinamica di equipe e trattamenti, unita alla possibilità di prenotare appuntamenti all'istante ottimizzando l'agenda medica.",
      tech: ['React', 'JavaScript', 'Tailwind', 'CSS3'],
      links: {
        github: 'https://github.com/salvatore-ritrovato',
        demo: 'https://studio-ferraro.vercel.app/',
      },
    },
    {
      id: 'p4',
      number: '04',
      title: 'Portfolio Engine',
      description: 'Sì, è esattamente il sito su cui ti trovi in questo momento. Un portfolio brutalista e ultra-leggero, costruito eliminando il superfluo: nessuna libreria di animazione pesante, solo pura logica CSS e Intersection Observer.',
      tech: ['React', 'Tailwind', 'CSS3'],
      links: {
        github: 'https://github.com/salvatore-ritrovato',
        demo: '#',
      },
    },
  ],
}

export const contact = {
  index: '05 / CONTACT',
  heading: 'Parliamone',
  description:
    'Hai un progetto, una collaborazione o solo voglia di scambiare due righe di codice? Scrivimi.',
  form: {
    fields: [
      { id: 'name', name: 'name', label: 'Nome', type: 'text', placeholder: 'Mario Rossi' },
      { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'mario@email.com' },
      {
        id: 'message',
        name: 'message',
        label: 'Messaggio',
        type: 'textarea',
        placeholder: 'Raccontami la tua idea...',
      },
    ],
    submitLabel: 'Invia messaggio',
    successMessage: 'Messaggio pronto! Apro il tuo client email…',
  },
  directEmailLabel: 'Oppure scrivimi direttamente',
}

export const socials = [
  { id: 'github', label: 'GitHub', handle: '@salv-ritrovato', href: 'https://github.com/salv-ritrovato' },
  { id: 'linkedin', label: 'LinkedIn', handle: '/in/salv-ritrovato', href: 'https://www.linkedin.com/in/salv-ritrovato/' },
  { id: 'email', label: 'Email', handle: site.email, href: `mailto:${site.email}` },
]

export const footer = {
  tagline: 'Progettato e sviluppato a mano. Niente template.',
  builtWith: ['React', 'Tailwind', 'CSS', 'Caffeina'],
  copyright: `© ${new Date().getFullYear()} ${site.name}. Tutti i diritti riservati.`,
}

// ============================================================
// Traduzioni IT / EN — single source of truth per i contenuti
// ============================================================

const shared = {
  socials: [
    { id: 'github', label: 'GitHub', handle: '@salv-ritrovato', href: 'https://github.com/salv-ritrovato' },
    { id: 'linkedin', label: 'LinkedIn', handle: '/in/salv-ritrovato', href: 'https://www.linkedin.com/in/salv-ritrovato/' },
  ],
  skillsItems: [
    { id: 'html', name: 'HTML5', glyph: '</>', category: 'Markup', level: 90 },
    { id: 'css', name: 'CSS3', glyph: '#', category: 'Style', level: 87 },
    { id: 'js', name: 'JavaScript', glyph: 'JS', category: 'Language', level: 72 },
    { id: 'react', name: 'React.js', glyph: 'Re', category: 'Framework', level: 68 },
    { id: 'node', name: 'Node.js', glyph: 'N', category: 'Runtime', level: 60 },
    { id: 'express', name: 'Express.js', glyph: 'Ex', category: 'Backend', level: 58 },
    { id: 'mysql', name: 'MySQL', glyph: 'DB', category: 'Database', level: 55 },
    { id: 'git', name: 'Git', glyph: '⎇', category: 'VCS', level: 75 },
    { id: 'github', name: 'GitHub', glyph: 'GH', category: 'Platform', level: 75 },
    { id: 'npm', name: 'npm', glyph: 'np', category: 'Tooling', level: 78 },
    { id: 'vscode', name: 'VS Code', glyph: '{ }', category: 'Editor', level: 92 },
    { id: 'cursor', name: 'Cursor', glyph: '▸', category: 'Editor', level: 75 },
  ],
  projectTech: {
    p1: ['React', 'JavaScript', 'Bootstrap', 'CSS3', 'Node.js', 'Express', 'MySQL'],
    p2: ['React', 'JavaScript', 'Tailwind', 'CSS3'],
    p3: ['React', 'JavaScript', 'Tailwind', 'CSS3'],
    p4: ['React', 'Tailwind', 'CSS3'],
    p5: ['React', 'JavaScript', 'CSS3', 'Tailwind'],
  },
  projectLinks: {
    p1: { github: 'https://github.com/salv-ritrovato/gamify', demo: 'https://gamify-store.vercel.app/' },
    p2: { github: 'https://github.com/salv-ritrovato/fitness-gym-tirone', demo: 'https://fitness-gym-tirone.vercel.app/' },
    p3: { github: 'https://github.com/salv-ritrovato/studio-ferraro', demo: 'https://studio-ferraro.vercel.app/' },
    p4: { github: 'https://github.com/salv-ritrovato/salvatore-portfolio', demo: '#' },
    p5: { github: 'https://github.com/salv-ritrovato/inlumine-studio', demo: 'https://inlumine-studio.vercel.app/' },
  },
}

export const translations = {
  it: {
    meta: {
      title: 'Salvatore Ritrovato — Web Developer',
      description:
        'Salvatore Ritrovato — Web Developer specializzato in React, Node.js e MySQL. UI/UX, design responsivo e performance web.',
    },
    site: {
      name: 'Salvatore Ritrovato',
      initials: 'SR',
      role: 'Web Developer',
      location: 'Italia',
      email: 'salv.ritrovato@gmail.com',
      availability: 'Disponibile per nuovi progetti',
    },
    nav: {
      brand: 'SR',
      links: [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'about', label: 'Chi sono', href: '#about' },
        { id: 'skills', label: 'Skills', href: '#skills' },
        { id: 'projects', label: 'Progetti', href: '#projects' },
        { id: 'contact', label: 'Contatti', href: '#contact' },
      ],
      cta: { label: 'Contattami', href: '#contact' },
    },
    hero: {
      index: '01 / HOME',
      greeting: 'Ciao, sono',
      name: 'SALVATORE\nRITROVATO',
      rolePrefix: 'Sono un',
      taglineRotation: [
        'Web Developer',
        'React Enthusiast',
        'Pixel Perfectionist',
        'Performance Nerd',
      ],
      description:
        'Costruisco interfacce reattive, pulite e completamente responsive con React e Node. Ossessionato dai dettagli, dall’UX e dalle performance web.',
      marquee: ['HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'EXPRESS', 'MYSQL', 'GIT', 'UI / UX', 'PERFORMANCE'],
      ctas: [
        { id: 'projects', label: 'I miei progetti', href: '#projects', variant: 'primary' },
        { id: 'contact', label: 'Contattami', href: '#contact', variant: 'ghost' },
      ],
    },
    about: {
      index: '02 / ABOUT',
      heading: 'Chi sono',
      photo: '/img/FotoCV.png',
      photoAlt: 'Salvatore Ritrovato',
      paragraphs: [
        'Sono un Web Developer focalizzato sul front-end moderno. Trasformo idee e mockup in prodotti digitali rapidi, accessibili e piacevoli da usare.',
        'La mia ossessione? L’incontro tra design e ingegneria: micro-interazioni curate, layout responsive impeccabili e codice ottimizzato per performance fulminee.',
        'Sviluppo applicazioni Full Stack con l’ecosistema JavaScript — React per l’interfaccia, Node ed Express sul back-end, MySQL per i dati — gestendo l’intero ciclo di sviluppo con Git e npm.',
        'Attualmente disponibile per progetti freelance e opportunità full-time in team che puntano alla qualità.',
      ],
      highlights: [
        { id: 'uiux', label: 'UI / UX', value: 'Design centrato sull’utente' },
        { id: 'responsive', label: 'Responsive', value: 'Mobile-first, sempre' },
        { id: 'perf', label: 'Performance', value: 'Ogni millisecondo conta' },
      ],
      stats: [
        { id: 'projects', value: '+4', label: 'Progetti' },
        { id: 'tech', value: '12', label: 'Tools & Tecnologie' },
        { id: 'coffee', value: '∞', label: 'Caffè / mese' },
      ],
    },
    skills: {
      index: '03 / SKILLS',
      heading: 'Stack & strumenti',
      description: 'Le tecnologie con cui lavoro ogni giorno.',
      items: shared.skillsItems,
    },
    projects: {
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
          tech: shared.projectTech.p1,
          links: shared.projectLinks.p1,
        },
        {
          id: 'p2',
          number: '02',
          title: 'Fitness Gym Mario Tirone',
          description:
            "Sito showcase per una realtà del bodybuilding a Sulmona (AQ), completamente fruibile da ogni dispositivo e sviluppato in React. Design d'impatto ed esperienza utente fluida: presenta in modo dinamico servizi, fondatore e attrezzature del centro, ottimizzando la conversione dei nuovi iscritti.",
          tech: shared.projectTech.p2,
          links: shared.projectLinks.p2,
        },
        {
          id: 'p3',
          number: '03',
          title: 'Studio Dentistico Ferraro',
          description:
            "Soluzione web responsive in React per uno studio dentistico, che unisce un sito showcase tradizionale a un sistema di prenotazione visite in tempo reale. Digitalizza la gestione dello studio e il rapporto con il paziente, con presentazione dinamica di equipe e trattamenti e prenotazioni istantanee.",
          tech: shared.projectTech.p3,
          links: shared.projectLinks.p3,
        },
        {
          id: 'p4',
          number: '04',
          title: 'Portfolio Engine',
          description:
            'Sì, è esattamente il sito su cui ti trovi in questo momento. Un portfolio brutalista e ultra-leggero, costruito eliminando il superfluo: nessuna libreria di animazione pesante, solo pura logica CSS e Intersection Observer.',
          tech: shared.projectTech.p4,
          links: shared.projectLinks.p4,
        },
        {
          id: 'p5',
          number: '05',
          title: 'inLumine Studio',
          featured: true,
          description:
            'Il progetto grafico di inLumine Studio rappresenta una delle sfide visive più ambiziose e stimolanti, nato dall’incontro creativo e dalla sinergia professionale con uno dei colleghi dell’agenzia. L’obiettivo principale dell’identità visiva è tradurre in segni e colori il concetto stesso di “luce” e innovazione. Il design si sviluppa attorno a un linguaggio visivo moderno, pulito e d’impatto, capace di comunicare solidità strategica e, al tempo stesso, una forte propensione al futuro e alla creatività digitale. Ogni elemento grafico è stato studiato per posizionare il brand come un punto di riferimento autorevole nel settore dello sviluppo e della strategia digitale.',
          tech: shared.projectTech.p5,
          links: shared.projectLinks.p5,
        },
      ],
    },
    contact: {
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
        mailtoSubject: (name) => `Contatto portfolio — ${name}`,
      },
      directEmailLabel: 'Oppure scrivimi direttamente',
      validation: {
        nameRequired: 'Il nome è obbligatorio.',
        nameShort: 'Nome troppo corto.',
        emailRequired: 'L’email è obbligatoria.',
        emailInvalid: 'Email non valida.',
        messageRequired: 'Scrivi un messaggio.',
        messageShort: 'Almeno 10 caratteri.',
      },
    },
    socials: [
      ...shared.socials,
      { id: 'email', label: 'Email', handle: 'salv.ritrovato@gmail.com', href: 'mailto:salv.ritrovato@gmail.com' },
    ],
    footer: {
      tagline: 'Progettato e sviluppato a mano. Niente template.',
      builtWith: ['React', 'Tailwind', 'CSS', 'Caffeina'],
      builtWithLabel: 'Realizzato con',
      navigate: 'Naviga',
      connect: 'Collegati',
      copyright: (year, name) => `© ${year} ${name}. Tutti i diritti riservati.`,
    },
    ui: {
      navigation: 'Navigazione',
      viewProject: 'Vedi progetto',
      backToTop: 'Torna su',
      openMenu: 'Apri menu',
      closeMenu: 'Chiudi menu',
      navDialog: 'Menu di navigazione',
      projectOnGithub: (title) => `${title} su GitHub`,
      projectDemo: (title) => `Demo di ${title}`,
      featuredLabel: 'Progetto di punta',
      languageSwitch: 'Cambia lingua',
      langIt: 'Italiano',
      langEn: 'English',
    },
  },

  en: {
    meta: {
      title: 'Salvatore Ritrovato — Web Developer',
      description:
        'Salvatore Ritrovato — Web Developer specializing in React, Node.js and MySQL. UI/UX, responsive design and web performance.',
    },
    site: {
      name: 'Salvatore Ritrovato',
      initials: 'SR',
      role: 'Web Developer',
      location: 'Italy',
      email: 'salv.ritrovato@gmail.com',
      availability: 'Available for new projects',
    },
    nav: {
      brand: 'SR',
      links: [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'about', label: 'About', href: '#about' },
        { id: 'skills', label: 'Skills', href: '#skills' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'contact', label: 'Contact', href: '#contact' },
      ],
      cta: { label: 'Get in touch', href: '#contact' },
    },
    hero: {
      index: '01 / HOME',
      greeting: 'Hi, I’m',
      name: 'SALVATORE\nRITROVATO',
      rolePrefix: 'I am a',
      taglineRotation: [
        'Web Developer',
        'React Enthusiast',
        'Pixel Perfectionist',
        'Performance Nerd',
      ],
      description:
        'I build reactive, clean and fully responsive interfaces with React and Node. Obsessed with details, UX and web performance.',
      marquee: ['HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'NODE.JS', 'EXPRESS', 'MYSQL', 'GIT', 'UI / UX', 'PERFORMANCE'],
      ctas: [
        { id: 'projects', label: 'My projects', href: '#projects', variant: 'primary' },
        { id: 'contact', label: 'Get in touch', href: '#contact', variant: 'ghost' },
      ],
    },
    about: {
      index: '02 / ABOUT',
      heading: 'About me',
      photo: '/img/FotoCV.png',
      photoAlt: 'Salvatore Ritrovato',
      paragraphs: [
        'I’m a Web Developer focused on modern front-end development. I turn ideas and mockups into fast, accessible and enjoyable digital products.',
        'My obsession? The intersection of design and engineering: polished micro-interactions, flawless responsive layouts and code optimized for blazing performance.',
        'I build Full Stack applications with the JavaScript ecosystem — React for the interface, Node and Express on the back-end, MySQL for data — managing the full development cycle with Git and npm.',
        'Currently available for freelance projects and full-time opportunities in quality-driven teams.',
      ],
      highlights: [
        { id: 'uiux', label: 'UI / UX', value: 'User-centered design' },
        { id: 'responsive', label: 'Responsive', value: 'Mobile-first, always' },
        { id: 'perf', label: 'Performance', value: 'Every millisecond counts' },
      ],
      stats: [
        { id: 'projects', value: '+4', label: 'Projects' },
        { id: 'tech', value: '12', label: 'Tools & Technologies' },
        { id: 'coffee', value: '∞', label: 'Coffee / month' },
      ],
    },
    skills: {
      index: '03 / SKILLS',
      heading: 'Stack & tools',
      description: 'The technologies I work with every day.',
      items: shared.skillsItems,
    },
    projects: {
      index: '04 / WORK',
      heading: 'Selected projects',
      description: 'A selection of my work. More on my GitHub.',
      items: [
        {
          id: 'p1',
          number: '01',
          title: 'Gamify (beta)',
          description:
            'Gamify is a responsive e-commerce web app for selling digital game keys. Built for a fluid, dynamic UX with no page reloads, it keeps product IDs fully hidden to maximize end-user security.',
          tech: shared.projectTech.p1,
          links: shared.projectLinks.p1,
        },
        {
          id: 'p2',
          number: '02',
          title: 'Fitness Gym Mario Tirone',
          description:
            'A showcase website for a bodybuilding gym in Sulmona, Italy — fully responsive and built with React. Bold design and smooth UX dynamically present services, the founder and equipment, optimized to convert new members.',
          tech: shared.projectTech.p2,
          links: shared.projectLinks.p2,
        },
        {
          id: 'p3',
          number: '03',
          title: 'Studio Dentistico Ferraro',
          description:
            'A responsive React web solution for a dental practice, combining a traditional showcase site with real-time appointment booking. It digitizes practice management and patient relations with dynamic team and treatment pages plus instant scheduling.',
          tech: shared.projectTech.p3,
          links: shared.projectLinks.p3,
        },
        {
          id: 'p4',
          number: '04',
          title: 'Portfolio Engine',
          description:
            'Yes, this is exactly the site you’re on right now. A brutalist, ultra-light portfolio built by cutting the fat: no heavy animation libraries, just pure CSS logic and Intersection Observer.',
          tech: shared.projectTech.p4,
          links: shared.projectLinks.p4,
        },
        {
          id: 'p5',
          number: '05',
          title: 'inLumine Studio',
          featured: true,
          description:
            'The visual design of inLumine Studio is one of my most ambitious and rewarding visual challenges, born from a creative meeting and professional synergy with one of the agency’s colleagues. The core goal of the visual identity is to translate the very concept of “light” and innovation into signs and colors. The design revolves around a modern, clean and striking visual language, able to convey strategic solidity while at the same time expressing a strong orientation toward the future and digital creativity. Every graphic element was crafted to position the brand as an authoritative reference point in the digital development and strategy field.',
          tech: shared.projectTech.p5,
          links: shared.projectLinks.p5,
        },
      ],
    },
    contact: {
      index: '05 / CONTACT',
      heading: 'Let’s talk',
      description:
        'Have a project, a collaboration in mind, or just want to exchange a few lines of code? Drop me a message.',
      form: {
        fields: [
          { id: 'name', name: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
          { id: 'email', name: 'email', label: 'Email', type: 'email', placeholder: 'john@email.com' },
          {
            id: 'message',
            name: 'message',
            label: 'Message',
            type: 'textarea',
            placeholder: 'Tell me about your idea...',
          },
        ],
        submitLabel: 'Send message',
        successMessage: 'Message ready! Opening your email client…',
        mailtoSubject: (name) => `Portfolio contact — ${name}`,
      },
      directEmailLabel: 'Or email me directly',
      validation: {
        nameRequired: 'Name is required.',
        nameShort: 'Name is too short.',
        emailRequired: 'Email is required.',
        emailInvalid: 'Invalid email address.',
        messageRequired: 'Please write a message.',
        messageShort: 'At least 10 characters.',
      },
    },
    socials: [
      ...shared.socials,
      { id: 'email', label: 'Email', handle: 'salv.ritrovato@gmail.com', href: 'mailto:salv.ritrovato@gmail.com' },
    ],
    footer: {
      tagline: 'Designed and built by hand. No templates.',
      builtWith: ['React', 'Tailwind', 'CSS', 'Caffeine'],
      builtWithLabel: 'Built with',
      navigate: 'Navigate',
      connect: 'Connect',
      copyright: (year, name) => `© ${year} ${name}. All rights reserved.`,
    },
    ui: {
      navigation: 'Navigation',
      viewProject: 'View project',
      backToTop: 'Back to top',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      navDialog: 'Navigation menu',
      projectOnGithub: (title) => `${title} on GitHub`,
      projectDemo: (title) => `${title} demo`,
      featuredLabel: 'Most ambitious yet',
      languageSwitch: 'Switch language',
      langIt: 'Italian',
      langEn: 'English',
    },
  },
}

export const locales = ['it', 'en']
export const defaultLocale = 'it'
export const storageKey = 'portfolio-locale'
# Salvatore Ritrovato — Portfolio

Portfolio personale da **Web Developer**. Single page application componentizzata,
estetica **brutalist-tech**: griglia rigida, contrasti estremi bianco/nero, un solo
colore neon (acid lime `#ccff00`), tipografia monospace.

## Stack

- **React.js** (Vite)
- **Tailwind CSS** (v3)
- **CSS plain** per variabili, animazioni custom ed effetti speciali
- **JavaScript ES6+**
- Nessuna libreria di animazione esterna — solo CSS + Intersection Observer

## Avvio

```bash
npm install
npm run dev
```

Build di produzione:

```bash
npm run build
npm run preview
```

## Struttura

```
src/
├── components/
│   ├── layout/      → Navbar, Footer, BackToTop
│   ├── sections/    → Hero, About, Skills, Projects, Contact
│   └── ui/          → Button, SectionHeading, ScrollReveal, AnimatedCursor, Tag
├── data/
│   └── portfolioData.js   → tutti i contenuti del sito (zero hardcoding nei componenti)
├── hooks/
│   └── useScrollReveal.js → Intersection Observer riutilizzabile
├── App.jsx
├── index.css        → variabili CSS, reset, font, animazioni globali
└── main.jsx
```

## Personalizzazione

Tutto il testo, i progetti, le skill e i link vivono in `src/data/portfolioData.js`.
I colori, i font e gli spazi sono definiti come CSS custom properties in `:root`
dentro `src/index.css`.

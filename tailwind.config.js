/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        fg: 'var(--color-fg)',
        muted: 'var(--color-muted)',
        accent: 'var(--color-accent)',
        line: 'var(--color-border)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      boxShadow: {
        brutal: '6px 6px 0 0 var(--color-fg)',
        'brutal-accent': '6px 6px 0 0 var(--color-accent)',
        'brutal-sm': '3px 3px 0 0 var(--color-fg)',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        surface: 'var(--surface)',
        ink: {
          DEFAULT: 'var(--ink)',
          soft: 'var(--ink-soft)',
        },
        rule: 'var(--rule)',
        allow: 'var(--allow)',
        block: 'var(--block)',
        hold: 'var(--hold)',
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
        panel: '6px',
      }
    },
  },
  plugins: [],
}

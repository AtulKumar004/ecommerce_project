/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e293b', // slate-800
          dark: '#334155', // slate-700
        },
        secondary: {
          DEFAULT: '#2563eb', // blue-600
          dark: '#1d4ed8', // blue-700
          light: '#3b82f6', // blue-500
          lighter: '#93c5fd', // blue-300
          muted: '#eff6ff', // blue-50
          ring: '#60a5fa', // blue-400
          border: '#bfdbfe', // blue-200
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',   
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        caption: ['0.75rem', { lineHeight: '1rem' }],
        'body-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        body: ['1rem', { lineHeight: '1.5rem' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        title: ['1.25rem', { lineHeight: '1.75rem' }],
        heading: ['1.5rem', { lineHeight: '2rem' }],
        display: ['1.875rem', { lineHeight: '2.25rem' }],
      },
    },
  },
  plugins: [],
};

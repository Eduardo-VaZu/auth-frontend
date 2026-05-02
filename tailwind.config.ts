import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B0D10',
        'background-elevated': '#11141A',
        surface: '#161B22',
        'surface-2': '#1B2230',
        'surface-3': '#202938',
        primary: '#7C6CFF',
        'primary-hover': '#9385FF',
        secondary: '#36C2FF',
        tertiary: '#39D98A',
        neutral: '#A7B0C0',
        'text-primary': '#F3F6FB',
        'text-secondary': '#A7B0C0',
        'text-muted': '#7E8797',
        'border-subtle': '#2B3445',
        'border-strong': '#39455A',
        success: '#39D98A',
        warning: '#FFB84D',
        error: '#FF6B7A',
        'on-primary': '#F7F8FF',
        'on-secondary': '#07131B',
        'on-surface': '#F3F6FB',
      },
      boxShadow: {
        panel: '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'panel-elevated': '0 8px 30px -4px rgba(0, 0, 0, 0.6)',
      },
    },
  },
  plugins: [],
}

export default config

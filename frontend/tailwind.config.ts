import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Public Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        vault: {
          bg: '#0a0e14',
          surface: '#121a25',
          elevated: '#1a2637',
          text: '#d9e6fd',
          accent: '#acc7ff',
          success: '#52b15b',
        },
      },
      keyframes: {
        'slide-in-from-bottom-2': {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        in: 'slide-in-from-bottom-2 0.2s ease-out, fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular']
    },
    extend: {
      colors: {
        primary: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        neutral: '#6B7280',
        muted: {
          DEFAULT: '#F1F5F9',
          foreground: '#64748B'
        }
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};


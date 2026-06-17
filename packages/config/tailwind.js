/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A56A0',
          dark: '#1A3A5C',
          light: '#EBF3FB',
          50: '#F4F8FD',
          100: '#EBF3FB',
          500: '#2E75B6',
          600: '#1A56A0',
          700: '#1A3A5C',
          800: '#0D2E5A',
          900: '#0D2E5A',
        },
        accent: {
          DEFAULT: '#E07B00',
          light: '#FEF3E2',
          700: '#7A4500',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36aaf5',
          500: '#0c8ee6',
          600: '#0070c4',
          700: '#01599f',
          800: '#064b83',
          900: '#0b3f6d',
          950: '#072849',
        },
        success: {
          700: '#1A6B3C',
          100: '#E6F4EC',
        },
        error: {
          700: '#8B1A1A',
          100: '#FDEAEA',
        },
        warning: {
          700: '#7A4500',
          100: '#FEF3E2',
        },
        text: {
          primary: '#1A1A2E',
          secondary: '#374151',
          tertiary: '#6B7280',
        },
        border: '#D1D5DB',
        severity: {
          critical: { text: '#991B1B', bg: '#FEE2E2', border: '#FCA5A5' },
          serious: { text: '#92400E', bg: '#FEF3C7', border: '#FCD34D' },
          moderate: { text: '#1E40AF', bg: '#DBEAFE', border: '#93C5FD' },
          minor: { text: '#374151', bg: '#F3F4F6', border: '#D1D5DB' },
        },
        accessible: {
          focus: '#1A56A0',
          error: '#8B1A1A',
          success: '#1A6B3C',
          warning: '#7A4500',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

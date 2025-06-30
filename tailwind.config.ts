import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      text: {
        xs: 'clamp(0.7rem, 0.14vw + 0.7rem, 0.8rem)',
        sm: 'clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem)',
        base: 'clamp(1rem, 0.34vw + 0.91rem, 1.19rem)',
        lg: 'clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem)',
        xl: 'clamp(1.56rem, 1vw + 1.31rem, 2.11rem)',
        '2xl': 'clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem)',
        '3xl': 'clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem)',
        '4xl': 'clamp(3.05rem, 3.54vw + 2.17rem, 5rem)',
        '5xl': 'clamp(3.81rem, 5.18vw + 2.52rem, 6.66rem)',
        '6xl': 'clamp(4.77rem, 7.48vw + 2.9rem, 8.88rem)',
      },
      colors: {
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        'primary-hover': 'var(--primary-hover)',
        'primary-disabled': 'var(--primary-disabled)',

        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        'secondary-200': 'var(--secondary-200)',
        'secondary-300': 'var(--secondary-300)',
        'secondary-400': 'var(--secondary-400)',
        'secondary-600': 'var(--secondary-600)',

        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',

        info: 'var(--info)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        success: 'var(--success)',

        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        'card-border': 'var(--card-border)',

        input: 'var(--input)',
        'input-foreground': 'var(--input-foreground)',
        'input-border': 'var(--input-border)',
        'input-placeholder': 'var(--input-placeholder)',

        border: 'var(--border)',
        ring: 'var(--ring)',

        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        foreground: '0 4px 6px -1px var(--foreground), 0 2px 4px -2px var(--foreground)',
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease',
        slideRight: 'slideRight 0.5s ease',
      },
    },
  },
  plugins: [],
};
export default config;

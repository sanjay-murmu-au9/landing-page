/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './lib/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: 'var(--primary)',
                'primary-dark': 'var(--primary-dark)',
                'primary-light': 'var(--primary-light)',
                secondary: 'var(--secondary)',
                'secondary-dark': 'var(--secondary-dark)',
                'secondary-light': 'var(--secondary-light)',
                accent: 'var(--accent)',
                'neutral-dark': 'var(--neutral-dark)',
                'neutral-light': 'var(--neutral-light)',
            },
            fontFamily: {
                sans: ['var(--font-montserrat)', 'Arial', 'sans-serif'],
                serif: ['var(--font-playfair)', 'Georgia', 'serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
            animation: {
                'pulse-slow': 'pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce': 'bounce 1s infinite',
                'shimmer': 'shimmer 2s infinite linear',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'fade-in-up': 'fadeInUp 1s ease-out forwards',
                'slide-in-right': 'slideInRight 0.8s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
            },
            keyframes: {
                'pulse-slow': {
                    '0%, 100%': {
                        opacity: 1,
                        transform: 'scale(1)',
                    },
                    '50%': {
                        opacity: .95,
                        transform: 'scale(1.02)',
                    },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
                'fadeIn': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'fadeInUp': {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'slideInRight': {
                    '0%': { transform: 'translateX(30px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
                'slideInLeft': {
                    '0%': { transform: 'translateX(-30px)', opacity: '0' },
                    '100%': { transform: 'translateX(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}

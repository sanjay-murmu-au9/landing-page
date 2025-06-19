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
            },
        },
    },
    plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'github': {
                    50: '#f6f8fa',
                    100: '#eaeef2',
                    200: '#d0d7de',
                    300: '#afb8c1',
                    400: '#8c959f',
                    500: '#6e7781',
                    600: '#57606a',
                    700: '#424a53',
                    800: '#32383f',
                    900: '#24292f',
                },
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {},
        colors: {
            primary: '#A7727D',
            secondary: '#EDDBC7',
            third: '#F8EAD8',
            background: '#F9F5E7',
            white: '#ffffff',
            primaryDark: '#635985',
            secondaryDark: '#443C68',
            thirdDark: '#393053 ',
            backgroundDark: '#18122B',
            black: '#000000',
        },
    },
    plugins: [],
    darkMode: 'class',
};

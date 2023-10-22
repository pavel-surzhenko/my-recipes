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
            primaryDark: '#18122B',
            secondaryDark: '#393053',
            thirdDark: '#443C68 ',
            backgroundDark: '#635985',
            black: '#000000',
            red: '#B33636',
            green: '#36B375',
        },
    },
    plugins: [],
    darkMode: 'class',
};

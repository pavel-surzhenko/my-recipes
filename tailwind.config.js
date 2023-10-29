/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            gridTemplateColumns: {
                1: 'repeat(1, minmax(300px, 65%))',
            },
            screens: {
                xs: '500px',
                smd: '850px',
            },
            boxShadow: {
                card: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
            },
        },
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
            categorySoups: '#D6D46D',
            categoryMain: '#F9B572',
            categorySalads: '#A8DF8E',
            categoryDesserts: '#9ED2BE',
        },
    },
    plugins: [],
    darkMode: 'class',
};

import type { Config } from 'tailwindcss';

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
                cardHover: 'rgba(0, 0, 0, 0.55) 0px 10px 15px;',
            },
            backgroundImage: {
                'new_recipes-bg': 'url(/background.svg)',
            },
        },
        colors: {
            primary: '#967E76',
            secondary: '#D7C0AE',
            background: '#EEE3CB',
            white: '#ffffff',
            primaryDark: '#2C2D30',
            secondaryDark: 'rgb(109 106 94 / 0.7)',
            backgroundDark: '#5F6168',
            black: '#000000',
            red: '#991e1e',
            green: '#305520',
            categorySoups: '#F5EEC8',
            categoryMain: '#B0926A',
            categorySalads: '#D2E3C8',
            categoryDesserts: '#FFCF96',
            categorySoupsDark: '#7F7922',
            categoryMainDark: '#544A38',
            categorySaladsDark: '#6C7C5B',
            categoryDessertsDark: '#8D5521',
        },
    },
    plugins: [],
    darkMode: 'class',
} satisfies Config;

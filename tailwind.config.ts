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
                header: 'inset 0px -23px 15px -3px rgba(0,0,0,0.1);',
            },
            backgroundImage: {
                'new_recipes-bg': 'url(/background.svg)',
            },
        },
        colors: {
            primary: '#4B9AD7',
            secondary: '#6FB5EB',
            background: '#efefef',
            white: '#ffffff',
            primaryDark: '#02050e',
            secondaryDark: '#222d33',
            backgroundDark: '#09161c',
            black: '#000000',
            red: '#991e1e',
            redLight: '#A93232',
            greenLight: '#4FA440',
            green: '#305520',
            blue: '#2e859e',
            categorySoups: '#5B92EB',
            categoryMain: '#3865EB',
            categorySalads: '#5BDAEB',
            categoryDesserts: '#945BEB',
            categorySoupsDark: '#337AA1',
            categoryMainDark: '#2937A3',
            categorySaladsDark: '#265B78',
            categoryDessertsDark: '#193C4F',
        },
    },
    plugins: [],
    darkMode: 'class',
} satisfies Config;

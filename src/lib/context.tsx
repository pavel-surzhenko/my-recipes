import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext<{ isThemeDark: boolean; handleThemeChange: () => void }>({
    isThemeDark: false,
    handleThemeChange: () => {},
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isThemeDark, setIsThemeDark] = useState<boolean>(() => {
        const storedTheme = localStorage.getItem('theme');
        return storedTheme
            ? JSON.parse(storedTheme)
            : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const handleThemeChange = () => {
        if (isThemeDark) {
            document.documentElement.className = '';
            setIsThemeDark(false);
        } else {
            document.documentElement.className = 'dark';
            setIsThemeDark(true);
        }
    };

    useEffect(() => {
        if (isThemeDark) {
            document.documentElement.className = 'dark';
        } else {
            document.documentElement.className = '';
        }
        localStorage.setItem('theme', JSON.stringify(isThemeDark));
    }, [isThemeDark]);

    return (
        <ThemeContext.Provider value={{ isThemeDark, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};

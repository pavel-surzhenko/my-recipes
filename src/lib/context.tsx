import { createContext, useState } from 'react';

export const ThemeContext = createContext<{ isThemeDark: boolean; handleThemeChange: () => void }>({
    isThemeDark: false,
    handleThemeChange: () => {},
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isThemeDark, setIsThemeDark] = useState<boolean>(
        window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    const handleThemeChange = () => {
        if (isThemeDark) {
            document.documentElement.className = '';
            setIsThemeDark(false);
        } else {
            document.documentElement.className = 'dark';
            setIsThemeDark(true);
        }
    };

    return (
        <ThemeContext.Provider value={{ isThemeDark, handleThemeChange }}>
            {children}
        </ThemeContext.Provider>
    );
};

import React, { useState, createContext, useContext, useEffect } from "react";

type ThemeContextType = {
    darkMode: boolean
    toggleTheme: (darkMode: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode((mode) => !mode);
    };

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type ProviderProps = {
    children: ReactNode
}

type ContextProps = {
    theme: "light" | "dark",
    setTheme: (theme: "light" | "dark") => void
}

// Create context
const ThemeContext = createContext<ContextProps>({
    theme: "light",
    setTheme: theme => null
});

// Create hook
const useTheme = () => {
    return useContext<ContextProps>(ThemeContext);
};

const ThemeProvider = ({ children }: ProviderProps) => {
    const [theme, setTheme] = useState<"light" | "dark">(window.matchMedia("(prefers-color-scheme: dark)") ? "dark" : "light");

    // Add Event Listener
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
        setTheme(event.matches ? "dark" : "light");
    });

    useEffect(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("light");
        
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={ { theme: theme, setTheme: setTheme } }>
            { children }
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, useTheme };

"use client";

import { ReactNode, useEffect } from "react";
import { useConfigStore } from "@/stores/config";

type Props = {
    children: ReactNode
}

const ThemeProvider = ({ children }: Props) => {
    const theme = useConfigStore((store) => store.theme);

    useEffect(() => {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.remove("light");

        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <>{ children }</>
    );
};

export { ThemeProvider };

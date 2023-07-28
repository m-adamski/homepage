import "@/styles/globals.css";

import { ReactNode } from "react";
import { Metadata } from "next";

// Webfonts Optimizing
// https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css
import { googlePoppins } from "@/webfonts/webfonts";
import { ThemeProvider } from "@/context/theme";

type Props = {
    children: ReactNode
}

export const metadata: Metadata = {
    title: "Homepage",
    description: "Just the Homepage with a nice photo and clock"
};

const RootLayout = ({ children }: Props) => {
    return (
        <html lang="en" className={ googlePoppins.variable }>
            <body className="bg-white text-base text-gray-500">
                <ThemeProvider>
                    { children }
                </ThemeProvider>
            </body>
        </html>
    );
};

export default RootLayout;

import LocalFont from "next/font/local";
import { Poppins } from "next/font/google";

const googlePoppins = Poppins({
    display: "swap",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    variable: "--font-poppins",
});

export { googlePoppins }

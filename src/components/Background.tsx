import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
    imageUrl: string,
    blurDataUrl: string,
    description: string,
    className?: string
}

const Background = ({ imageUrl, blurDataUrl, description, className }: Props) => {
    return (
        <Image fill
               unoptimized
               placeholder="blur"
               blurDataURL={ blurDataUrl }
               className={ cn("fixed left-0 top-0 w-full h-full object-cover object-center transition-opacity ease-in-out duration-700 delay-200", className) }
               src={ imageUrl }
               alt={ description } />
    );
};

export { Background };

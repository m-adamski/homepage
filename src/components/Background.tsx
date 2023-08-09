import Image from "next/image";

type Props = {
    imageUrl: string,
    blurDataUrl: string,
    description: string
}

const Background = ({ imageUrl, blurDataUrl, description }: Props) => {
    return (
        <Image fill
               unoptimized
               placeholder="blur"
               blurDataURL={ blurDataUrl }
               className="fixed left-0 top-0 w-full h-full object-cover object-center z-0"
               src={ imageUrl }
               alt={ description } />
    );
};

export { Background };

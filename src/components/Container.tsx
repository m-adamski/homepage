import { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const Container = ({ children }: Props) => {
    return (
        <div className="relative w-full min-h-screen">
            { children }
        </div>
    );
};

export default Container;

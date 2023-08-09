"use client";

import { useEffect, useState } from "react";

const Clock = () => {
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        const clockInterval = setInterval(() => {
            setDate(new Date());
        }, 1000);

        return () => clearInterval(clockInterval);
    }, []);

    return (
        <p className="fixed right-16 top-16 font-light text-7xl text-white text-shadow">
            { date.toLocaleTimeString([], { timeStyle: "short" }) }
        </p>
    );
};

export { Clock };

"use client";

import Link from "next/link";
import { RefreshCw, Settings } from "lucide-react";

import { useConfigStore } from "@/stores/config";
import { ConfigSchema } from "@/schema/config";

import { Clock } from "@/components/Clock";
import { Button } from "@/components/ui/Button";
import { ConfigDialog } from "@/components/ConfigDialog";

const Homepage = () => {
    const [
        query,
        refreshInterval,
        setQuery,
        setRefreshInterval
    ] = useConfigStore((state) => [state.query, state.refreshInterval, state.setQuery, state.setRefreshInterval]);

    // Save config to the localStorage
    const onSubmit = (config: ConfigSchema) => {
        setQuery(config.query);
        setRefreshInterval(config.refreshInterval);
    };

    const refreshBackground = () => {
        console.log("Refreshing background..");
    };

    return (
        <div className="relative w-full min-h-screen bg-amber-50">
            <Clock />

            <div className="fixed left-0 bottom-0 w-full grid grid-cols-3 items-center p-10">
                <p className="text-left">Photo by <Link href="https://example.com" rel="nofollow">Nikola Sample</Link></p>
                <div className="flex flex-row justify-center items-center gap-x-2">

                    <ConfigDialog config={ { query: query, refreshInterval: refreshInterval } } onSubmit={ onSubmit }>
                        <Button variant="outline" size="icon">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </ConfigDialog>

                    <Button variant="outline" size="icon" onClick={ () => refreshBackground() }>
                        <RefreshCw className="w-4 h-4" />
                    </Button>

                </div>
                <p className="text-right">Lesnica, North Macedonia</p>
            </div>
        </div>
    );
};

export default Homepage;

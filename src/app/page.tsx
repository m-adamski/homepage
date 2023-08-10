"use client";

import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MoonStar, RefreshCw, Settings, Sun } from "lucide-react";

import { useConfigStore } from "@/stores/config";
import { ConfigSchema } from "@/schema/config";
import { Photo } from "@/types/photo";

import { Clock } from "@/components/Clock";
import { Button } from "@/components/ui/Button";
import { ConfigDialog } from "@/components/ConfigDialog";
import { useToast } from "@/components/ui/use-toast";
import { Background } from "@/components/Background";

// https://nextjs.org/docs/messages/react-hydration-error#solution-2-disabling-ssr-on-specific-components
const Container = dynamic(() => import("@/components/Container"), { ssr: false });

const Homepage = () => {
    const { toast } = useToast();
    const [isConfigDialogOpen, setConfigDialogOpen] = useState<boolean>(false);

    const [
        query,
        refreshInterval,
        autoRefresh,
        lastRefresh,
        theme,
        photo,
        setQuery,
        setTheme,
        setPhoto,
        setRefreshInterval,
        setAutoRefresh,
        resetRefresh
    ] = useConfigStore((state) => [
        state.query,
        state.refreshInterval,
        state.autoRefresh,
        state.lastRefresh,
        state.theme,
        state.photo,
        state.setQuery,
        state.setTheme,
        state.setPhoto,
        state.setRefreshInterval,
        state.setAutoRefresh,
        state.resetRefresh
    ]);

    // Save config to the localStorage
    const onSubmit = (config: ConfigSchema) => {
        setQuery(config.query);
        setRefreshInterval(config.refreshInterval);
        setAutoRefresh(config.autoRefresh);

        toast({
            title: "Configuration",
            description: "The configuration changes have been saved successfully"
        });
    };

    // Toggle theme
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    // Refresh background
    const refreshBackground = async () => {
        const response = await fetch(`/server/photo?query=${ query }`);

        if (!response.ok) {
            console.log("Error while fetching data");
        }

        const responseData: Photo = await response.json();

        // Update state
        setPhoto(responseData);
        resetRefresh();
    };

    // Refresh background when autoRefresh is enabled and it's time to refresh
    useEffect(() => {
        if (!photo || (autoRefresh && moment(lastRefresh).add(refreshInterval, "minutes").isBefore())) {
            refreshBackground();
        }
    }, []); // eslint-disable-line

    return (
        <Container>
            { photo &&
                <Background imageUrl={ photo.url } blurDataUrl={ photo.blurHash } description={ photo.location || photo.author.name } />
            }

            <Clock />

            <div className="fixed left-0 bottom-0 w-full grid grid-cols-3 items-center p-10 z-50">
                { photo &&
                    <p className="text-left text-gray-200 text-shadow">
                        Photo by <Link href={ photo.author.portfolioUrl } className="hover:text-gray-500"
                                       rel="nofollow">{ photo.author.name }</Link>
                    </p>
                }

                <div className="flex flex-row justify-center items-center gap-x-2">

                    {/* Config Dialog */ }
                    <ConfigDialog config={ { query: query, refreshInterval: refreshInterval, autoRefresh: autoRefresh } } onSubmit={ onSubmit }>
                        <Button variant="outline" size="icon">
                            <Settings className="w-4 h-4" />
                        </Button>
                    </ConfigDialog>

                    {/* Toggle Theme */ }
                    <Button variant="outline" size="icon" onClick={ () => toggleTheme() }>
                        { theme === "dark" ? <MoonStar className="w-4 h-4" /> : <Sun className="w-4 h-4" /> }
                    </Button>

                    {/* Refresh Background */ }
                    <Button variant="outline" size="icon" onClick={ () => refreshBackground() }>
                        <RefreshCw className="w-4 h-4" />
                    </Button>

                </div>

                { photo &&
                    <p className="text-right text-gray-200 text-shadow">{ photo.location || "" }</p>
                }
            </div>
        </Container>
    );
};

export default Homepage;

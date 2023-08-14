"use client";

import moment from "moment";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MoonStar, RefreshCw, Settings, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
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
    const [backgroundClassName, setBackgroundClassName] = useState<string>("opacity-100");

    const [
        query,
        refreshInterval,
        autoRefresh,
        lastRefresh,
        theme,
        background,
        nextBackground,
        setQuery,
        setTheme,
        setBackground,
        setNextBackground,
        setRefreshInterval,
        setAutoRefresh,
        resetRefresh,
        rewriteBackground,
        resetNextBackground
    ] = useConfigStore((state) => [
        state.query,
        state.refreshInterval,
        state.autoRefresh,
        state.lastRefresh,
        state.theme,
        state.background,
        state.nextBackground,
        state.setQuery,
        state.setTheme,
        state.setBackground,
        state.setNextBackground,
        state.setRefreshInterval,
        state.setAutoRefresh,
        state.resetRefresh,
        state.rewriteBackground,
        state.resetNextBackground
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
            toast({
                title: "Refresh",
                description: "An error occurred while fetching background image. Please wait a while and try again..",
                variant: "destructive"
            });

            return;
        }

        // Parse response
        const responseData: Photo = await response.json();

        // Animate background using CSS opacity
        setNextBackground(responseData);
        setBackgroundClassName("opacity-0"); // duration-700

        setTimeout(() => {
            resetRefresh();
            rewriteBackground();
            setBackgroundClassName("opacity-100");

            setTimeout(() => {
                resetNextBackground();
            }, 2000);
        }, 1000);
    };

    // Refresh background when autoRefresh is enabled and it's time to refresh
    useEffect(() => {
        if (!background || (autoRefresh && moment(lastRefresh).add(refreshInterval, "minutes").isBefore())) {
            refreshBackground();
        }
    }, []); // eslint-disable-line

    return (
        <Container>
            { background &&
                <Background imageUrl={ background.url }
                            blurDataUrl={ background.blurHash }
                            description={ background.location || background.author.name }
                            className={ cn(backgroundClassName, "z-10") } />
            }

            { nextBackground &&
                <Background imageUrl={ nextBackground.url }
                            blurDataUrl={ nextBackground.blurHash }
                            description={ nextBackground.location || nextBackground.author.name }
                            className="z-0" />
            }

            <Clock />

            <div className="fixed left-0 bottom-0 w-full grid grid-cols-3 items-center p-10 z-50">
                { background &&
                    <p className="text-left text-gray-200 text-shadow">
                        Photo by <Link href={ background.author.portfolioUrl } className="hover:text-gray-500"
                                       rel="nofollow">{ background.author.name }</Link>
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

                { background &&
                    <p className="text-right text-gray-200 text-shadow">{ background.location || "" }</p>
                }
            </div>
        </Container>
    );
};

export default Homepage;

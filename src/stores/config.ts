import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Config } from "@/types/config";
import { Photo } from "@/types/photo";

type ConfigState = Config & {
    setQuery: (value: string) => void,
    setTheme: (value: "dark" | "light") => void,
    setBackground: (value: Photo) => void,
    setNextBackground: (value: Photo) => void,
    setRefreshInterval: (value: number) => void,
    setAutoRefresh: (value: boolean) => void,
    resetRefresh: () => void,
    rewriteBackground: () => void,
    resetNextBackground: () => void
}

const useConfigStore = create<ConfigState>()(
    persist((set) => ({
            query: "nature landscape",
            refreshInterval: 30,
            autoRefresh: false,
            lastRefresh: Date.now(),
            theme: "dark",
            background: null,
            nextBackground: null,
            // background: {
            //     url: "https://images.unsplash.com/photo-1545583257-23b2b9800500?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODA4MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTA1NDcwMDh8&ixlib=rb-4.0.3&q=85",
            //     blurHash: "LH9u;=HvQwIXx@owahWBDAoztLtN",
            //     location: "One Forest in Dooars, Dooars, India",
            //     author: {
            //         name: "Boudhayan Bardhan",
            //         portfolioUrl: "https://unsplash.com/@yan_slg"
            //     }
            // },
            setQuery: (value) => set((state) => ({ query: value })),
            setTheme: (value) => set((state) => ({ theme: value })),
            setBackground: (value) => set((state) => ({ background: value })),
            setNextBackground: (value) => set((state) => ({ nextBackground: value })),
            setRefreshInterval: (value) => set((state) => ({ refreshInterval: value })),
            setAutoRefresh: (value) => set((state) => ({ autoRefresh: value })),
            resetRefresh: () => set((state) => ({ lastRefresh: Date.now() })),
            rewriteBackground: () => set((state) => ({ background: state.nextBackground ? state.nextBackground : state.background })),
            resetNextBackground: () => set((state) => ({ nextBackground: null }))
        }), { name: "config", version: 0 }
    )
);

export { useConfigStore };

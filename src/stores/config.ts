import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Config } from "@/types/config";

type ConfigState = Config & {
    setQuery: (value: string) => void,
    setRefreshInterval: (value: number) => void,
    resetRefresh: () => void
}

const useConfigStore = create<ConfigState>()(
    persist((set) => ({
            query: "nature landscape",
            refreshInterval: 30,
            lastRefresh: Date.now(),
            setQuery: (value) => set((state) => ({ query: value })),
            setRefreshInterval: (value) => set((state) => ({ refreshInterval: value })),
            resetRefresh: () => set((state) => ({ lastRefresh: Date.now() }))
        }), { name: "config" }
    )
);

export { useConfigStore };

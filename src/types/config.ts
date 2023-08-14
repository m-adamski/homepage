import { Photo } from "@/types/photo";
import { ConfigSchema } from "@/schema/config";

type Config = ConfigSchema & {
    lastRefresh: number,
    theme: "dark" | "light",
    background: Photo | null,
    nextBackground: Photo | null,
}

export { type Config };

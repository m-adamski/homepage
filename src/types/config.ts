import { Photo } from "@/types/photo";
import { ConfigSchema } from "@/schema/config";

type Config = ConfigSchema & {
    lastRefresh: number,
    theme: "dark" | "light",
    photo: Photo | null
}

export { type Config };

import { ConfigSchema } from "@/schema/config";

type Config = ConfigSchema & {
    lastRefresh: number
}

export { type Config };

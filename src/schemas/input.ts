import { z } from "zod/mini";

export const inputSchema = z.object({
    query: z.string(),
    autoRefresh: z.boolean(),
    autoRefreshInterval: z.number(),
    lastRefreshTimestamp: z.number()
});

export type InputSchema = z.infer<typeof inputSchema>;

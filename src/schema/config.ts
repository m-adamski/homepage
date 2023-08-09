import { z } from "zod";

const configSchema = z.object({
    query: z.string().nonempty().regex(/^[a-zA-Z0-9\\ ]+$/g, "Only the characters a-z, A-Z, 0-9 and space are allowed"),
    refreshInterval: z.preprocess((value) => Number(value), z.number().positive().min(1)),
    autoRefresh: z.boolean()
});

export { configSchema };
export type ConfigSchema = z.infer<typeof configSchema>

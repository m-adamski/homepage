import { z } from "zod";

const configSchema = z.object({
    query: z.string(),
    refreshInterval: z.preprocess((value) => Number(value), z.number().positive().min(1))
});

export { configSchema };
export type ConfigSchema = z.infer<typeof configSchema>

import { z } from "zod/mini";
import { inputSchema } from "./input.ts";

export const configSchema = z.object({
    input: inputSchema,
    background: z.object({
        image: z.string(),
        width: z.int(),
        height: z.int(),
        blurHash: z.string(),
        color: z.string(),
        location: z.nullable(z.string()),
        description: z.nullable(z.string()),
        author: z.object({
            name: z.string(),
            portfolio: z.string()
        })
    })
});

export type ConfigSchema = z.infer<typeof configSchema>;

import { z } from "astro/zod";
import { defineAction, ActionError } from "astro:actions";
import { UNSPLASH_ACCESS_TOKEN } from "astro:env/server";
import { type ResponseSchema, responseSchema } from "../schemas/response.ts";

export const server = {
    refreshBackground: defineAction({
        input: z.object({
            query: z.string()
        }),
        handler: async (input): Promise<ResponseSchema> => {
            const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${ input.query }`, {
                headers: { Authorization: `Client-ID ${ UNSPLASH_ACCESS_TOKEN }` },
                cache: "no-cache"
            });

            if (!response.ok) {
                throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to fetch image from Unsplash" });
            }

            const data = await response.json();
            const parseResult = responseSchema.safeParse(data);

            if (!parseResult.success) {
                throw new ActionError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to parse Unsplash response" });
            }

            return { ...parseResult.data, ...{ query: input.query } };
        }
    })
};

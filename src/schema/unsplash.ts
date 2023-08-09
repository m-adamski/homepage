import { z } from "zod";

const randomPhotoSchema = z.object({
    id: z.string(),
    slug: z.string(),
    color: z.string(),
    blur_hash: z.string(),
    urls: z.object({
        full: z.string()
    }),
    location: z.object({
        name: z.string().nullable()
    }),
    user: z.object({
        name: z.string(),
        links: z.object({
            html: z.string()
        })
    })
});

export { randomPhotoSchema };
export type RandomPhoto = z.infer<typeof randomPhotoSchema>

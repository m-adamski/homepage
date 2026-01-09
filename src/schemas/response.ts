import { z } from "zod/mini";

export const responseSchema = z.object({
    "width": z.int(),
    "height": z.int(),
    "color": z.string(),
    "blur_hash": z.string(),
    "urls": z.object({
        "raw": z.string(),
        "full": z.string(),
        "regular": z.string()
    }),
    "location": z.object({
        "name": z.nullable(z.string()),
        "city": z.nullable(z.string()),
        "country": z.nullable(z.string())
    }),
    "user": z.object({
        "name": z.string(),
        "links": z.object({
            "html": z.string()
        })
    })
});

// export const responseSchema = z.object({
//     "id": z.string(),
//     "slug": z.string(),
//     "width": z.int(),
//     "height": z.int(),
//     "color": z.string(),
//     "blur_hash": z.string(),
//     "description": z.nullable(z.string()),
//     "urls": z.object({
//         "raw": z.string(),
//         "full": z.string(),
//         "regular": z.string()
//     }),
//     "location": z.object({
//         "name": z.nullable(z.string()),
//         "city": z.nullable(z.string()),
//         "country": z.nullable(z.string())
//     }),
//     "user": z.object({
//         "username": z.string(),
//         "name": z.string(),
//         "first_name": z.string(),
//         "last_name": z.string(),
//         "portfolio_url": z.nullable(z.string()),
//         "location": z.nullable(z.string()),
//         "links": z.object({
//             "self": z.string(),
//             "html": z.string(),
//             "photos": z.string(),
//             "likes": z.string(),
//             "portfolio": z.string()
//         })
//     })
// });

export type ResponseSchema = z.infer<typeof responseSchema> & { query: string };

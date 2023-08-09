import { decode } from "blurhash";

import { Photo } from "@/types/photo";
import { randomPhotoSchema } from "@/schema/unsplash";
import { getDataUrl } from "@/lib/blur";

const getRandom = async (query: string): Promise<Photo | null> => {
    const response = await fetch(`https://api.unsplash.com/photos/random?orientation=landscape&query=${ query }`, {
        headers: { Authorization: `Client-ID ${ process.env.UNSPLASH_ACCESS_TOKEN }` },
        cache: "no-cache"
    });

    if (!response.ok) {
        console.error("Request error:", response.statusText);
        return null;
    }

    try {
        const responseData = await response.json();
        const parseData = randomPhotoSchema.parse(responseData);

        return {
            url: parseData.urls.full,
            blurHash: getDataUrl(parseData.blur_hash) || "",
            location: parseData.location.name,
            author: {
                name: parseData.user.name,
                portfolioUrl: parseData.user.links.html
            }
        };
    } catch (err) {
        console.error("Error while parsing response:", err);
        return null;
    }
};

export { getRandom };

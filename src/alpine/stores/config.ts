import { configSchema, type ConfigSchema } from "../../schemas/config.ts";
import type { ResponseSchema } from "../../schemas/response.ts";
import type { InputSchema } from "../../schemas/input.ts";

export default {
    parseResponse(response: ResponseSchema, input: InputSchema): ConfigSchema {
        return {
            input: input,
            background: {
                image: response.urls.full,
                width: response.width,
                height: response.height,
                blurHash: response.blur_hash,
                color: response.color,
                location: response.location.name || "" + (response.location.country !== null ? `, ${ response.location.country }` : ""),
                description: `Photo by ${ response.user.name } on Unsplash`,
                author: {
                    name: response.user.name,
                    portfolio: response.user.links.html
                }
            }
        };
    },
    fetch(): ConfigSchema {
        const storedConfig = localStorage.getItem("config");

        if (null !== storedConfig) {
            const parseResult = configSchema.safeParse(JSON.parse(storedConfig));

            // Stored config seems valid, so return it
            if (parseResult.success) return parseResult.data;
        }

        // Define the default config and store it in the local storage
        const defaultConfig: ConfigSchema = {
            input: {
                query: "forest drone",
                autoRefresh: true,
                autoRefreshInterval: 10,
                lastRefreshTimestamp: Date.now()
            },
            background: {
                image: "https://images.unsplash.com/photo-1712828113127-a54d4b55746a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODA4MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjcxOTE3Nzd8&ixlib=rb-4.1.0&q=85",
                width: 5438,
                height: 3622,
                blurHash: "LEGuaA~AD,Io^%}]xFS0E3t3-CxG",
                color: "#737340",
                location: "Poland",
                description: "Photo by Damian Karpiński on Unsplash",
                author: {
                    name: "Damian Karpiński",
                    portfolio: "https://unsplash.com/@damiankarpinski_photo"
                }
            }
        };

        this.persist(defaultConfig);
        return defaultConfig;
    },
    persist(config: ConfigSchema) {
        localStorage.setItem("config", JSON.stringify(config));
    }
};

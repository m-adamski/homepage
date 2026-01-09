// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
    env: {
        schema: {
            UNSPLASH_ACCESS_TOKEN: envField.string({ context: "server", access: "secret" })
        }
    },
    image: {
        domains: [ "images.unsplash.com" ]
    },
    vite: {
        plugins: [ tailwindcss() ]
    },
    integrations: [ alpinejs() ]
});

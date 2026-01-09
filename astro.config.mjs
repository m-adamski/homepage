// @ts-check
import { defineConfig, envField } from "astro/config";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
    adapter: node({
        mode: "standalone"
    }),
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

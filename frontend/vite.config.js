import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],

    define: {
        "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
    },

    server: {
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    },
});

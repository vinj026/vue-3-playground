import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      "/api/tenders": {
        target: "https://tenders.guru",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tenders/, "/api/pl/tenders"),
      },
    },
  },
});

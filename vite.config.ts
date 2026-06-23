import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // `@` → src, so imports read `@/components/...` (shadcn convention)
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react") || id.includes("react-dom")) return "react-vendor";

          if (
            id.includes("motion") ||
            id.includes("@radix-ui") ||
            id.includes("class-variance-authority") ||
            id.includes("lucide-react")
          ) {
            return "ui-vendor";
          }

          if (
            id.includes("@tsparticles/plugin-polygon-mask") ||
            id.includes("@tsparticles/react") ||
            id.includes("tsparticles")
          ) {
            return "particles";
          }

          if (id.includes("pathseg") || id.includes("react-terminal-ui")) {
            return "utils";
          }
        },
      },
    },
  },
});

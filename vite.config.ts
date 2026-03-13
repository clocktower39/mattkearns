import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("react") || id.includes("react-dom")) return "react-vendor";

          if (
            id.includes("@mui/material") ||
            id.includes("@mui/icons-material") ||
            id.includes("@emotion/react") ||
            id.includes("@emotion/styled")
          ) {
            return "mui-vendor";
          }

          if (
            id.includes("@tsparticles/plugin-polygon-mask") ||
            id.includes("@tsparticles/react") ||
            id.includes("tsparticles")
          ) {
            return "particles";
          }

          if (
            id.includes("pathseg") ||
            id.includes("react-google-recaptcha") ||
            id.includes("react-photo-gallery") ||
            id.includes("react-terminal-ui")
          ) {
            return "utils";
          }
        },
      },
    },
  },
});

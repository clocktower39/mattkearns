import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "mui-vendor": [
            "@mui/material",
            "@mui/icons-material",
            "@emotion/react",
            "@emotion/styled",
          ],
          particles: ["@tsparticles/plugin-polygon-mask", "@tsparticles/react", "tsparticles"],
          utils: ["pathseg", "react-google-recaptcha", "react-photo-gallery", "react-terminal-ui"],
        },
      },
    },
  },
});

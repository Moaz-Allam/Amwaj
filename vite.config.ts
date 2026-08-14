import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

const copyHtaccessPlugin = () => ({
  name: "copy-htaccess",
  closeBundle() {
    const source = path.resolve(__dirname, "public/.htaccess");
    const target = path.resolve(__dirname, "dist/.htaccess");

    if (fs.existsSync(source)) {
      fs.copyFileSync(source, target);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger(), copyHtaccessPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

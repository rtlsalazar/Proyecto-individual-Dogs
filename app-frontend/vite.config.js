import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    publicDir: './public',
    define: {
      "process.env": env,
    },
    plugins: [react(), svgr()],
    loader: {
      ".js": "jsx",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@routes": path.resolve(__dirname, 'src/routes'),
        "@store": path.resolve(__dirname, 'src/store'),
        "@pages": path.resolve(__dirname, 'src/pages'),
        "@assets": path.resolve(__dirname, 'src/assets'),
        "@components": path.resolve(__dirname, 'src/components'),
      },
    },
    build: {
      outDir: "build",
    },
    server: {
      port: 80,
      host: true
    },
  };
});

/// <reference types="vitest" />
/// <reference types="vite/client" />
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  plugins: [react(), tsconfigPaths(), vanillaExtractPlugin()],
  // @see https://vitest.dev/guide/#configuring-vitest
  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["html"],
      reportsDirectory: "./coverage",
    },
  },
  cacheDir: "node_modules/.cache/vitest",
});

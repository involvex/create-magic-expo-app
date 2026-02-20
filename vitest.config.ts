import reactSwc from "@vitejs/plugin-react-swc";
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  plugins: [reactSwc()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/.expo/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["packages/*/src/**/*.{js,ts,jsx,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./packages/app/src"),
    },
  },
  optimizeDeps: {
    exclude: ["react-native", "@testing-library/react-native"],
  },
});

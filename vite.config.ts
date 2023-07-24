import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "@alpacahq/alpaca-ts",
    },
    rollupOptions: {
      external: ["@alpacahq/alpaca-ts"],
      output: {
        exports: "named",
        globals: {
          "@alpacahq/alpaca-ts": "AlpacaTS",
        },
      },
    },
  },
});
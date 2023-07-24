import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "@master-chief/alpaca-ts",
    },
    rollupOptions: {
      external: ["@master-chief/alpaca-ts"],
      output: {
        exports: "named",
        globals: {
          "@master-chief": "AlpacaTS",
        },
      },
    },
  },
});
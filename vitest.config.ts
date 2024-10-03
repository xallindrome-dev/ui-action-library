// vitest.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
/// <reference types="vitest" />

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  test: {
    include: ["**/*.test.tsx", "**/*.test.ts"],
    globals: true,
    environment: "jsdom", // Use jsdom for DOM testing
  },
});

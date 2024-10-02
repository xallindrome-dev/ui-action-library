import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UIActionLibrary",
      formats: ["es", "umd"],
      fileName: (format) => `ui-action-library.${format}.js`,
    },
  },
});

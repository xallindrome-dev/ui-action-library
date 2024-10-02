import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts", // Main entry point for the library
  output: [
    {
      file: "dist/ui-action-library.esm.js",
      format: "es", // ES module format
      name: "UIActionLibrary", // Global variable name for UMD builds
      sourcemap: true,
    },
    {
      file: "dist/ui-action-library.umd.js",
      format: "umd", // UMD format for broader compatibility
      name: "UIActionLibrary", // Global variable name for UMD builds
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // Resolves node_modules imports
    commonjs(), // Converts CommonJS to ES modules
    typescript(), // TypeScript plugin to compile TS to JS
    terser(), // Minify the output files for production
  ],
  external: [], // Add external dependencies here if needed (e.g., 'react', 'lodash')
};

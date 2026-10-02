import { nodeResolve } from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import fs from "fs";

const polyfillsPath = "src/polyfills.ts";

const prependPolyfillsPlugin = {
  name: "prepend-polyfills",
  generateBundle(options, bundle) {
    const polyfillsContent = fs.readFileSync(polyfillsPath, "utf-8");

    for (const [fileName, chunk] of Object.entries(bundle)) {
      if (fileName === "main.js" && chunk.type === "chunk") {
        chunk.code = `${polyfillsContent}\n${chunk.code}`;
        console.log("Polyfills prepended to main.js!");
      }
    }
  },
};

export default {
  input: "src/main.ts",
  external: [
    "http-request",
    "cookies",
    "log",
    "streams",
    "text-encode-transform",
  ],
  output: {
    format: "es",
    dir: "dist",
  },
  preserveModules: false,
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      extensions: [".js", ".ts"],
    }),
    commonjs(),
    json(),
    copy({
      targets: [
        {
          src: ["bundle.json"],
          dest: "dist",
        },
      ],
    }),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
      extensions: [".js", ".ts"],
      presets: ["@babel/preset-env", "@babel/preset-typescript"],
    }),
    prependPolyfillsPlugin,
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { DEFAULT_EXTENSIONS } from "@babel/core";

export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom", "@impulse/embed-js"],
    output: [
      {
        file: "dist/index.js",
        format: "cjs",
        sourcemap: true,
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.build.json", // Use build-specific config
        declaration: true,
        declarationDir: "dist",
        include: ["src/**/*"],
        exclude: ["node_modules", "dist", "../**/*"],
      }),
      babel({
        extensions: [...DEFAULT_EXTENSIONS, ".ts", ".tsx"],
        babelHelpers: "bundled",
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
      }),
    ],
  },
];

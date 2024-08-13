import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

// NEW
import packageJson from "./package.json" assert { type: "json" };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: false,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: false,
            },
        ],
        plugins: [
            peerDepsExternal(),
            resolve(),
            commonjs(),
            postcss(),
            typescript({ 
                tsconfig: "./tsconfig.json",
                declaration: true,
                declarationDir: "dist/esm/types",
             }),
        ],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts.default()],

        // NEW
        external: [/\.css$/],
        watch: {
            clearScreen: true,
            chokidar: {
                usePolling: true,
                interval: 100000,
            },
        },
    }
];
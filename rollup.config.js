import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import esbuild from 'rollup-plugin-esbuild'
import postcss from "rollup-plugin-postcss";

const packageJson = require("./package.json");
const production = !process.env.ROLLUP_WATCH
const { sep } = require('path')

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: packageJson.main, format: 'cjs', sourcemap: true },
      { file: packageJson.module, format: 'esm', sourcemap: true }
    ],
    plugins: [
      resolve({
        browser: true,
        extensions: ['.js', '.ts', '.tsx', '.json', '.scss']
      }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        extract: true,
        minimize: production,
        sourceMap: !production
      }),
      esbuild({
        include: /\.tsx?$/,
        exclude: ['/node_modules/', '/stories/'],
        sourceMap: true,
        minify: production,
        target: 'es6',
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment'
      })
    ],
    external: [...Object.keys(packageJson.peerDependencies)],
    onwarn(warning, warn) {
      if (warning.code === 'CIRCULAR_DEPENDENCY') {
        if (warning.message.includes(`${sep}luxon${sep}`)) {
          return
        }
      }
      warn(warning)
    }
  },
  {
    input: 'types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/]
  }
];

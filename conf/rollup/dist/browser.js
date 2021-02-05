import json from '@rollup/plugin-json'
import banner from '../../banner'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { DIST_UNIVERSAL as outDir, SRC } from '../../const'

// THIS SCRIPT BUILDS VARIOUS BUNDLES WITH ALL THE DEPENDENCIES
// UMD BUILDs for classic imports
// ESM BUILDs for type="module" imports

export default {
  input: `${SRC}/index.ts`,
  plugins: [
    typescript({
      // declaration: true,
      // declarationDir: `${outDir}`,
      sourceMap: true,
      removeComments: true,
      module: 'ESNext', //"None", "CommonJS", "AMD", "System", "UMD", "ES6", "ES2015" or "ESNext"
      target: 'ESNext', //"ES3"  "ES5" "ES6"/"ES2015" "ES2016" "ES2017" "ES2018" "ES2019" "ES2020" "ESNext"
    }),
    json(),
    commonjs(),
    nodeResolve({ browser: true }),
  ],
  output: [
    {
      file: `${outDir}/alpaca.browser.js`,
      // dir: `${outDir}`,
      format: 'umd',
      name: 'alpaca',
      sourcemap: true,
      banner: banner,
    },
    {
      file: `${outDir}/alpaca.browser.min.js`,
      // dir:`${outDir}`,
      format: 'umd',
      name: 'alpaca',
      sourcemap: false,
      banner: banner,
      plugins: [terser({ output: { comments: false } })],
    },
    // {
    //   file: `${outDir}/alpaca.common.js`,
    //   // dir: `${outDir}`,
    //   format: 'cjs', // amd,cjs,es,iife,umd,system
    //   name: 'alpaca',
    //   sourcemap: true,
    //   banner: banner,
    // },
    {
      file: `${outDir}/alpaca.modern.js`,
      // dir: outDir,
      format: 'es',
      name: 'alpaca',
      sourcemap: true,
      banner: banner,
    },
    {
      file: `${outDir}/alpaca.modern.min.js`,
      // dir: outDir,
      format: 'es',
      name: 'alpaca',
      sourcemap: false,
      banner: banner,
      plugins: [terser({ output: { comments: false } })],
    },
  ],
}

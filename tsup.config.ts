import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/node/cli.ts', 'src/node/index.ts', 'src/node/dev.ts'],
  bundle: true,
  splitting: true,
  outDir: 'dist',
  format: ['cjs', 'esm'],
  dts: true, //类型文件
  shims: true,
  banner: {
    js: 'import { createRequire as createRequire0 } from "module"; const require = createRequire0(import.meta.url);'
  },
  clean: true
});

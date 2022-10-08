import { defineConfig } from 'tsup'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  external: ['discord.js', 'axios'],
  minify: isProduction,
  watch: !isProduction,
  sourcemap: isProduction,
  clean: true
})

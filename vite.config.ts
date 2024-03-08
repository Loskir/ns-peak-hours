import { defineConfig } from 'vite'

import preact from '@preact/preset-vite'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    preact(),
    // @ts-ignore
    process.env.ANALYZE === '1' &&
      analyzer({ analyzerMode: 'server', openAnalyzer: true }),
  ],
  build: {
    sourcemap: true,
  },
})

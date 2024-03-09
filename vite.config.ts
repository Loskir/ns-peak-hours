import { defineConfig } from 'vite'

import preact from '@preact/preset-vite'
import { analyzer } from 'vite-bundle-analyzer'

const isDebug = process.env.DEBUG === '1'

export default defineConfig({
  plugins: [
    preact(),
    isDebug &&
      analyzer({ analyzerMode: 'server', openAnalyzer: true }),
  ],
  build: {
    sourcemap: isDebug,
  },
})

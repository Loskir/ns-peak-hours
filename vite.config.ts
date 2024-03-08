import { defineConfig } from 'vite'

import { analyzer } from 'vite-bundle-analyzer'

const isDebug = process.env.DEBUG === '1'

export default defineConfig({
  plugins: [
    isDebug &&
      analyzer({ analyzerMode: 'server', openAnalyzer: true }),
  ],
  build: {
    sourcemap: isDebug,
  },
})

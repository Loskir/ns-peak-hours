import { defineConfig } from 'vite'

import solid from 'vite-plugin-solid'
import { analyzer } from 'vite-bundle-analyzer'

const isDebug = process.env.DEBUG === '1'

export default defineConfig({
  plugins: [
    solid(),
    isDebug &&
      analyzer({ analyzerMode: 'server', openAnalyzer: true }),
  ],
  build: {
    sourcemap: isDebug,
  },
})

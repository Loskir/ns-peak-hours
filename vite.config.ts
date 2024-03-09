import { defineConfig } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { analyzer } from 'vite-bundle-analyzer'

const isDebug = process.env.DEBUG === '1'

export default defineConfig({
  plugins: [
    svelte(),
    isDebug &&
      analyzer({ analyzerMode: 'server', openAnalyzer: true }),
  ],
  build: {
    sourcemap: isDebug,
  },
})

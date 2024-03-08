import { defineConfig } from 'vite'

import { svelte } from '@sveltejs/vite-plugin-svelte'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    svelte(),
    // @ts-ignore
    process.env.ANALYZE === '1' &&
      analyzer({ analyzerMode: 'server', openAnalyzer: true }),
  ],
  build: {
    sourcemap: true,
  },
})

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter(),
    ssr: false, // 👈 disables server-side rendering
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
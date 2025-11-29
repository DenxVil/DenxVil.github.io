import { defineConfig } from 'astro/config';
import tailwindcss from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://denx.me',
  integrations: [tailwindcss()],
  output: 'static',
  build: {
    assets: '_assets'
  }
});

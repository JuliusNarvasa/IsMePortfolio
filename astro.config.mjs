import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  output: 'static',

  // Deployed at https://me.bambaw-tumba.com (reverseproxy VPS)
  site: 'https://me.bambaw-tumba.com',

  server: {
    port: 4321,
  },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});

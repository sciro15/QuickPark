import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react'; // Asegúrate de importar React

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()], // Agrega la integración de React aquí
  output: 'server',
});


import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement depuis le fichier .env
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Rend process.env.API_KEY disponible dans le code client
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement depuis le fichier .env ou l'environnement système (Vercel)
  // Le 3ème argument '' permet de charger toutes les variables, pas seulement celles préfixées par VITE_
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Rend process.env.API_KEY disponible dans le code client pour compatibilité
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// Configuración de Vite: activamos React y Tailwind CSS
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import PasaporteProvider from './hooks/PasaporteProvider'

// Punto de entrada: "monta" la app dentro del <div id="root"> de index.html.
// BrowserRouter permite navegar entre páginas sin recargar, usando la barra de direcciones.
// Para publicarla dentro de un Artifact de claude.ai (que no permite cambiar la dirección)
// se compila con VITE_ARTIFACT=1 y usa MemoryRouter: navega igual, pero "en memoria".
const Router = import.meta.env.VITE_ARTIFACT ? MemoryRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      {/* El pasaporte (puntos, seguidos…) queda disponible para toda la app */}
      <PasaporteProvider>
        <App />
      </PasaporteProvider>
    </Router>
  </StrictMode>,
)

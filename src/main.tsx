import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import PasaporteProvider from './hooks/PasaporteProvider'

// Punto de entrada: "monta" la app dentro del <div id="root"> de index.html.
// BrowserRouter permite navegar entre páginas sin recargar.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* El pasaporte (puntos, seguidos…) queda disponible para toda la app */}
      <PasaporteProvider>
        <App />
      </PasaporteProvider>
    </BrowserRouter>
  </StrictMode>,
)

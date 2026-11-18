import { useEffect } from 'react'
import { Route, Routes, useLocation, type Location } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Inicio from './pages/Inicio'
import Narrativa from './pages/Narrativa'
import Disenadores from './pages/Disenadores'
import PerfilDisenador from './pages/PerfilDisenador'
import Ferias from './pages/Ferias'
import Pasaporte from './pages/Pasaporte'
import Comunidad from './pages/Comunidad'
import Marcas from './pages/Marcas'
import ComoFunciona from './pages/ComoFunciona'
import NoEncontrada from './pages/NoEncontrada'

/**
 * Mapa de rutas de RADAR.
 *
 * Truco del modal: cuando se abre una prenda desde el feed, el enlace guarda
 * la página de origen en `state.fondo`. Así dibujamos la página de origen
 * debajo y la narrativa encima como ventana. Si alguien entra directo a
 * /prenda/p1 (sin fondo), la narrativa se ve como página normal.
 */
export default function App() {
  const location = useLocation()
  const fondo = (location.state as { fondo?: Location } | null)?.fondo

  // La página que se ve "de fondo" (si hay modal, la de origen)
  const pagina = fondo ?? location

  // Al cambiar de página volvemos arriba (abrir o cerrar el modal no cuenta)
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pagina.pathname])

  return (
    <>
      <Routes location={pagina}>
        <Route element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="prenda/:id" element={<Narrativa />} />
          <Route path="disenadores" element={<Disenadores />} />
          <Route path="disenadores/:id" element={<PerfilDisenador />} />
          <Route path="ferias" element={<Ferias />} />
          <Route path="pasaporte" element={<Pasaporte />} />
          <Route path="comunidad" element={<Comunidad />} />
          <Route path="marcas" element={<Marcas />} />
          <Route path="como-funciona" element={<ComoFunciona />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>

      {/* Si hay página de fondo, la narrativa se dibuja encima como modal */}
      {fondo && (
        <Routes>
          <Route path="prenda/:id" element={<Narrativa />} />
        </Routes>
      )}
    </>
  )
}

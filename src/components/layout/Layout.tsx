import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import BarraSuperior from './BarraSuperior'
import BarraPasos from './BarraPasos'
import Pie from './Pie'

/**
 * Estructura común de todas las páginas.
 * <Outlet /> es el "hueco" donde React Router dibuja la página actual.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const primeraVez = useRef(true)

  // Al cambiar de página, llevamos el foco al título (h1) de la nueva página.
  // Así un lector de pantalla anuncia dónde estás. En la primera carga no lo hacemos.
  useEffect(() => {
    if (primeraVez.current) {
      primeraVez.current = false
      return
    }
    const titulo = mainRef.current?.querySelector<HTMLElement>('h1')
    if (titulo) {
      titulo.setAttribute('tabindex', '-1')
      titulo.focus({ preventScroll: true })
    }
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Enlace para saltar directo al contenido (útil con teclado y lector de pantalla) */}
      <a
        href="#contenido"
        className="solo-lector focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:h-auto focus:w-auto focus:rounded-suave focus:bg-carbon focus:px-4 focus:py-2 focus:text-algodon"
      >
        Saltar al contenido
      </a>
      <BarraSuperior />
      <BarraPasos />
      <main ref={mainRef} id="contenido" tabIndex={-1} className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 focus:outline-none">
        {/* key = dirección: al cambiar de página se vuelve a montar y se anima */}
        <div key={pathname} className="animate-aparecer">
          <Outlet />
        </div>
      </main>
      <Pie />
    </div>
  )
}

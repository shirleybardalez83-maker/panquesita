import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePasaporte } from '../../hooks/usePasaporte'
import { IconoCampana } from './Iconos'

/**
 * Campana de notificaciones con panel desplegable.
 * - Muestra un número si hay novedades sin ver.
 * - Al abrir se marcan como vistas.
 * - Se cierra con Esc, al hacer clic fuera o al elegir un enlace.
 */
export default function Notificaciones() {
  const { actividad, noLeidas, marcarLeidas } = usePasaporte()
  const [abierto, setAbierto] = useState(false)
  const contenedorRef = useRef<HTMLDivElement>(null)
  const botonRef = useRef<HTMLButtonElement>(null)

  // Mientras está abierto: Esc y clic afuera lo cierran
  useEffect(() => {
    if (!abierto) return
    function alTeclear(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setAbierto(false)
        botonRef.current?.focus()
      }
    }
    function alClic(e: MouseEvent) {
      if (!contenedorRef.current?.contains(e.target as Node)) setAbierto(false)
    }
    document.addEventListener('keydown', alTeclear)
    document.addEventListener('mousedown', alClic)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.removeEventListener('mousedown', alClic)
    }
  }, [abierto])

  function alternar() {
    if (!abierto) marcarLeidas()
    setAbierto((a) => !a)
  }

  return (
    <div ref={contenedorRef} className="relative">
      <button
        ref={botonRef}
        type="button"
        aria-expanded={abierto}
        aria-controls="panel-notificaciones"
        onClick={alternar}
        className="relative grid h-11 w-11 place-items-center rounded-full text-carbon hover:bg-algodon-oscuro"
      >
        <IconoCampana />
        {/* El nombre accesible se arma con texto: "Notificaciones 2 nuevas" */}
        <span className="solo-lector">Notificaciones</span>
        {noLeidas > 0 && (
          <span
            className="absolute right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-arcilla px-1 text-[11px] font-bold text-white"
          >
            {noLeidas > 9 ? '9+' : noLeidas}
            <span className="solo-lector">{noLeidas === 1 ? ' nueva' : ' nuevas'}</span>
          </span>
        )}
      </button>

      {abierto && (
        <div
          id="panel-notificaciones"
          // En celular ocupa el ancho de la barra (con márgenes); desde tablet, se ancla a la campana
          className="fixed inset-x-4 top-16 z-50 animate-aparecer overflow-hidden sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-88 rounded-tarjeta border border-algodon-oscuro bg-white shadow-xl"
        >
          <p className="border-b border-algodon-oscuro px-4 py-3 font-bold text-carbon">Notificaciones</p>
          {actividad.length === 0 ? (
            <p className="px-4 py-5 text-sm text-gris-calido">
              Todavía no hay novedades. Sigue a un diseñador o escanea en una feria para empezar.
            </p>
          ) : (
            <ul className="max-h-80 divide-y divide-algodon-oscuro overflow-y-auto">
              {actividad.slice(0, 8).map((a) => (
                <li key={a.id} className="flex gap-3 px-4 py-3 text-sm">
                  <span className="flex-1 text-carbon">{a.texto}</span>
                  {a.puntos ? <span className="shrink-0 font-extrabold text-laguna">+{a.puntos}</span> : null}
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/pasaporte"
            onClick={() => setAbierto(false)}
            className="block border-t border-algodon-oscuro px-4 py-3 text-center text-sm font-bold text-arcilla hover:bg-algodon"
          >
            Ver mi pasaporte
          </Link>
        </div>
      )}
    </div>
  )
}

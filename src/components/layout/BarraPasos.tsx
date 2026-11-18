import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PASOS, pasoActual } from '../../navegacion'

/**
 * Barra "así funciona": muestra los 5 pasos del recorrido.
 * Marca el paso actual (aria-current="step") y cada paso es un enlace.
 * En celular se desplaza horizontalmente.
 */
export default function BarraPasos() {
  const location = useLocation()
  const actual = pasoActual(location.pathname)
  const listaRef = useRef<HTMLOListElement>(null)

  // En pantallas angostas la lista se desplaza: centramos el paso actual para que se vea
  useEffect(() => {
    const lista = listaRef.current
    const activo = lista?.querySelector<HTMLElement>('[aria-current="step"]')
    if (!lista || !activo) return
    lista.scrollTo({ left: activo.offsetLeft - (lista.clientWidth - activo.offsetWidth) / 2 })
  }, [actual])

  return (
    <nav aria-label="Así funciona RADAR" className="border-b border-algodon-oscuro bg-white/70">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
        <p className="hidden shrink-0 font-nota text-xl text-gris-calido lg:block">así funciona:</p>
        <ol ref={listaRef} className="relative -mx-1 flex flex-1 snap-x gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
          {PASOS.map((paso, i) => {
            const esActual = paso.numero === actual
            const completado = actual !== null && paso.numero < actual
            return (
              <li key={paso.numero} className="flex shrink-0 snap-start items-center">
                <Link
                  to={paso.ruta}
                  // El paso 2 abre la narrativa como modal sobre la página donde estás
                  state={paso.numero === 2 && actual !== 2 ? { fondo: location } : undefined}
                  aria-current={esActual ? 'step' : undefined}
                  className={`flex min-h-11 items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors ${
                    esActual
                      ? 'bg-arcilla text-white'
                      : 'text-gris-calido hover:bg-algodon-oscuro hover:text-carbon'
                  }`}
                >
                  <span
                    className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
                      esActual
                        ? 'bg-white text-arcilla'
                        : completado
                          ? 'bg-laguna text-white'
                          : 'border border-gris-calido/50 text-gris-calido'
                    }`}
                  >
                    {paso.numero}
                  </span>
                  <span className="font-bold">{paso.titulo}</span>
                  <span className="hidden xl:inline">{paso.detalle}</span>
                </Link>
                {/* Separador entre pasos */}
                {i < PASOS.length - 1 && (
                  <span aria-hidden="true" className="mx-1 h-px w-4 bg-gris-calido/40" />
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}

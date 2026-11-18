import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom'
import { ENLACES_SECUNDARIOS, PESTANAS } from '../../navegacion'
import { IconoCerrar } from './Iconos'
import PatronTextil from '../marca/PatronTextil'

/**
 * Menú desplegable para celular.
 * - Se cierra con Esc, con el botón cerrar o al elegir un enlace.
 * - Al abrirse, el foco pasa al botón cerrar; al cerrarse vuelve al botón de menú.
 * - El foco queda atrapado dentro mientras está abierto.
 * - Se dibuja con un "portal" directo en <body>, para que ningún contenedor lo recorte.
 */
type Props = {
  abierto: boolean
  onCerrar: () => void
}

export default function MenuMovil({ abierto, onCerrar }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const cerrarRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!abierto) return
    // Guardamos qué elemento tenía el foco para devolvérselo al cerrar
    const anterior = document.activeElement as HTMLElement | null
    cerrarRef.current?.focus()
    // Evitamos que la página de fondo se desplace
    document.body.style.overflow = 'hidden'

    function alPresionarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') onCerrar()
      // Trampa de foco: Tab desde el último vuelve al primero y viceversa
      if (e.key === 'Tab' && panelRef.current) {
        const enfocables = panelRef.current.querySelectorAll<HTMLElement>('a, button')
        const primero = enfocables[0]
        const ultimo = enfocables[enfocables.length - 1]
        if (e.shiftKey && document.activeElement === primero) {
          e.preventDefault()
          ultimo.focus()
        } else if (!e.shiftKey && document.activeElement === ultimo) {
          e.preventDefault()
          primero.focus()
        }
      }
    }
    document.addEventListener('keydown', alPresionarTecla)

    return () => {
      document.removeEventListener('keydown', alPresionarTecla)
      document.body.style.overflow = ''
      anterior?.focus()
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  const claseEnlace = ({ isActive }: { isActive: boolean }) =>
    `block rounded-suave px-4 py-3 text-lg font-semibold ${
      isActive ? 'bg-carbon text-algodon' : 'text-carbon hover:bg-algodon-oscuro'
    }`

  return createPortal(
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Fondo oscuro: al tocarlo se cierra */}
      <div className="absolute inset-0 animate-fundido bg-carbon/40" onClick={onCerrar} aria-hidden="true" />

      <div
        id="menu-movil"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
        className="absolute right-0 top-0 flex h-full animate-desde-derecha w-[85%] max-w-sm flex-col overflow-y-auto bg-algodon shadow-xl"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <p className="font-nota text-2xl text-arcilla">del feed a la feria</p>
          <button
            ref={cerrarRef}
            type="button"
            aria-label="Cerrar menú"
            onClick={onCerrar}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-algodon-oscuro"
          >
            <IconoCerrar />
          </button>
        </div>

        <nav aria-label="Menú móvil" className="px-3">
          <ul className="space-y-1">
            {PESTANAS.map((p) => (
              <li key={p.ruta}>
                <NavLink to={p.ruta} end={p.ruta === '/'} className={claseEnlace} onClick={onCerrar}>
                  {p.etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
          <hr className="my-4 border-algodon-oscuro" />
          <ul className="space-y-1">
            {ENLACES_SECUNDARIOS.map((p) => (
              <li key={p.ruta}>
                <NavLink to={p.ruta} className={claseEnlace} onClick={onCerrar}>
                  {p.etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mx-4 mt-6 rounded-full bg-ocre px-4 py-2 text-center text-sm font-bold text-carbon">
          Gratis para todos
        </div>

        {/* Franja textil decorativa al final */}
        <div className="mt-auto h-16 overflow-hidden">
          <PatronTextil escala={32} />
        </div>
      </div>
    </div>,
    document.body,
  )
}

import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { IconoCerrar } from '../layout/Iconos'

/**
 * Ventana modal accesible.
 * - Se cierra con Esc, con la X o haciendo clic en el fondo oscuro.
 * - El foco entra al abrir, queda atrapado dentro y vuelve a donde estaba al cerrar.
 * - La página de fondo queda "inerte" (no se puede enfocar ni hacer clic) y no se desplaza.
 */
type Props = {
  /** id del título del modal, para que el lector de pantalla lo anuncie */
  tituloId: string
  onCerrar: () => void
  children: ReactNode
  /** Ancho máximo (clase de Tailwind) */
  ancho?: string
}

const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'

export default function Modal({ tituloId, onCerrar, children, ancho = 'max-w-5xl' }: Props) {
  const dialogoRef = useRef<HTMLDivElement>(null)
  // Guardamos onCerrar en una "ref" para no reiniciar el efecto si la función cambia
  const cerrarRef = useRef(onCerrar)
  useEffect(() => {
    cerrarRef.current = onCerrar
  })

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null
    const raiz = document.getElementById('root')
    raiz?.setAttribute('inert', '')
    document.body.style.overflow = 'hidden'
    dialogoRef.current?.querySelector<HTMLElement>('[data-autofoco]')?.focus()

    function alPresionarTecla(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        cerrarRef.current()
      }
      if (e.key === 'Tab' && dialogoRef.current) {
        const lista = dialogoRef.current.querySelectorAll<HTMLElement>(ENFOCABLES)
        if (lista.length === 0) return
        const primero = lista[0]
        const ultimo = lista[lista.length - 1]
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
      raiz?.removeAttribute('inert')
      document.body.style.overflow = ''
      // Devolvemos el foco a donde estaba (si ese elemento sigue en la página)
      if (anterior?.isConnected) anterior.focus()
    }
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-50 animate-fundido overflow-y-auto bg-carbon/60 px-3 py-6 sm:px-6 sm:py-10"
      // Clic en el fondo (no dentro de la ventana) = cerrar
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar()
      }}
    >
      <div
        ref={dialogoRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        className={`relative mx-auto ${ancho} animate-ventana rounded-bloque bg-algodon shadow-2xl`}
      >
        <button
          type="button"
          data-autofoco
          aria-label="Cerrar"
          onClick={onCerrar}
          className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-algodon/95 text-carbon shadow hover:bg-white"
        >
          <IconoCerrar />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  )
}

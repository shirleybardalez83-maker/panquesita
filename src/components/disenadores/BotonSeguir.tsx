import { PUNTOS } from '../../config'
import { usePasaporte } from '../../hooks/usePasaporte'
import type { Disenador } from '../../data/tipos'

/**
 * Botón Seguir / Siguiendo.
 * - aria-pressed indica si está activo.
 * - La primera vez muestra el premio (+5 pts) para que se sepa antes de pulsar.
 */
type Props = {
  disenador: Pick<Disenador, 'id' | 'nombre'>
  className?: string
}

export default function BotonSeguir({ disenador, className = '' }: Props) {
  const { estaSiguiendo, daPuntosSeguir, alternarSeguir } = usePasaporte()
  const siguiendo = estaSiguiendo(disenador.id)
  const premio = !siguiendo && daPuntosSeguir(disenador.id)

  return (
    <button
      type="button"
      aria-pressed={siguiendo}
      onClick={() => alternarSeguir(disenador.id, disenador.nombre)}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 px-5 py-2 text-sm font-bold transition-colors ${
        siguiendo
          ? 'border-laguna bg-laguna text-white hover:bg-white hover:text-laguna'
          : 'border-carbon bg-white text-carbon hover:bg-carbon hover:text-algodon'
      } ${className}`}
    >
      {siguiendo ? (
        <>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 7.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Siguiendo
        </>
      ) : (
        'Seguir'
      )}
      <span className="solo-lector"> a {disenador.nombre}</span>
      {premio && (
        <span className="rounded-full bg-ocre px-2 py-0.5 text-xs text-carbon">+{PUNTOS.seguirDisenador} pts</span>
      )}
    </button>
  )
}

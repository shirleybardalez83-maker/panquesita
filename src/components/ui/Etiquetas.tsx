import { obtenerAtmosfera } from '../../data/atmosferas'
import type { AtmosferaId } from '../../data/tipos'

/** Etiqueta con el nombre de la atmósfera (ocre suave de fondo, texto carbón). */
export function EtiquetaAtmosfera({ id, className = '' }: { id: AtmosferaId; className?: string }) {
  return (
    <span
      className={`inline-block rounded-full bg-ocre-suave px-3 py-1 text-xs font-bold tracking-wide text-carbon ${className}`}
    >
      {obtenerAtmosfera(id).nombre}
    </span>
  )
}

/** Insignia "Perfil destacado" para marcas con la mejora de perfil. */
export function InsigniaDestacado({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-laguna px-3 py-1 text-xs font-bold text-white ${className}`}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
        <path d="M3 0h4v3h3v4H7v3H3V7H0V3h3z" fill="#D39A2F" />
      </svg>
      Perfil destacado
    </span>
  )
}

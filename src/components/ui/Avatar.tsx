import { useState } from 'react'
import type { Disenador } from '../../data/tipos'

/** Foto redonda del diseñador; si no tiene foto (o no carga), muestra sus iniciales. */
type Props = {
  disenador: Pick<Disenador, 'nombre' | 'iniciales' | 'foto'>
  tamano?: 'sm' | 'md' | 'lg'
  className?: string
}

const TAMANOS = {
  sm: 'h-10 w-10 text-sm',
  md: 'h-16 w-16 text-lg',
  lg: 'h-28 w-28 text-3xl',
}

export default function Avatar({ disenador, tamano = 'md', className = '' }: Props) {
  const [fallo, setFallo] = useState(false)
  const base = `${TAMANOS[tamano]} shrink-0 rounded-full border-4 border-algodon ${className}`

  if (disenador.foto && !fallo) {
    return (
      <img
        src={disenador.foto}
        alt={`Foto de ${disenador.nombre}`}
        onError={() => setFallo(true)}
        className={`${base} object-cover`}
      />
    )
  }

  return (
    <span
      role="img"
      aria-label={`Iniciales de ${disenador.nombre}`}
      className={`${base} grid place-items-center bg-laguna font-bold text-white`}
    >
      {disenador.iniciales}
    </span>
  )
}

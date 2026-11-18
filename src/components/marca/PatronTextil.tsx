import { useId } from 'react'

/**
 * Patrón textil andino geométrico (rombos escalonados y zigzag) en SVG.
 * Sirve como acento decorativo y como fondo de los placeholders de imagen.
 * Es decorativo, por eso lleva aria-hidden (los lectores de pantalla lo ignoran).
 */
type Props = {
  className?: string
  /** Color principal de las figuras */
  color?: string
  /** Color del fondo */
  fondo?: string
  /** Tamaño de cada repetición del patrón en px */
  escala?: number
}

export default function PatronTextil({
  className = '',
  color = '#A6372B',
  fondo = '#F7F4EC',
  escala = 48,
}: Props) {
  // useId genera un id único para que varios patrones en la misma página no choquen
  const id = useId()

  return (
    <svg className={className} width="100%" height="100%" aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width={escala} height={escala} patternUnits="userSpaceOnUse" viewBox="0 0 48 48">
          <rect width="48" height="48" fill={fondo} />
          {/* Rombo escalonado central */}
          <path d="M20 8h8v4h4v4h4v8h-4v4h-4v4h-8v-4h-4v-4h-4v-8h4v-4h4z" fill={color} opacity="0.85" />
          <rect x="22" y="18" width="4" height="4" fill="#D39A2F" />
          {/* Zigzag inferior */}
          <path d="M0 44l6-6 6 6 6-6 6 6 6-6 6 6 6-6 6 6" fill="none" stroke="#1F5662" strokeWidth="2" opacity="0.7" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

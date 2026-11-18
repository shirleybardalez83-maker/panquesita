/**
 * Íconos SVG simples (sin emojis ni librerías externas).
 * Son decorativos: el texto accesible lo pone el botón que los contiene.
 */
type Props = { className?: string }

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
}

export function IconoCampana({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  )
}

export function IconoMenu({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconoCerrar({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

/** Pequeño rombo escalonado, se usa junto a los puntos */
export function IconoPuntos({ className }: Props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false">
      <path d="M6 1h4v3h3v3h2v2h-2v3h-3v3H6v-3H3V9H1V7h2V4h3z" fill="#D39A2F" />
      <rect x="6.5" y="6.5" width="3" height="3" fill="#1A1714" />
    </svg>
  )
}

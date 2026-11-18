/**
 * Logotipo de RADAR hecho en SVG (dibujo vectorial: se ve nítido a cualquier tamaño).
 * - Círculo de radar con anillos.
 * - Cruz andina escalonada (chakana) en arcilla con centro ocre.
 * - Aguja del radar en laguna.
 */
type Props = {
  /** Tamaño del símbolo en píxeles */
  tamano?: number
  /** Si es true, muestra también la palabra "RADAR" al lado */
  conTexto?: boolean
  className?: string
  /** Clases extra para la palabra "RADAR" (ej. ocultarla en pantallas muy angostas) */
  claseTexto?: string
}

export function SimboloRadar({ tamano = 40, className = '' }: { tamano?: number; className?: string }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Círculo exterior y anillos del radar */}
      <circle cx="32" cy="32" r="30" fill="#F7F4EC" stroke="#A6372B" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="21" fill="none" stroke="#1A1714" strokeOpacity="0.15" strokeWidth="1" />
      <circle cx="32" cy="32" r="12" fill="none" stroke="#1A1714" strokeOpacity="0.15" strokeWidth="1" />
      {/* Cruz andina escalonada: tres escalones por lado */}
      <path
        d="M27 15h10v5h5v5h5v14h-5v5h-5v5H27v-5h-5v-5h-5V25h5v-5h5z"
        fill="#A6372B"
      />
      {/* Centro ocre */}
      <rect x="28" y="28" width="8" height="8" fill="#D39A2F" />
      {/* Aguja del radar en laguna */}
      <line x1="32" y1="32" x2="52" y2="12" stroke="#1F5662" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="32" r="2.5" fill="#1F5662" />
    </svg>
  )
}

export default function LogoRadar({ tamano = 40, conTexto = true, className = '', claseTexto = '' }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <SimboloRadar tamano={tamano} />
      {conTexto && (
        <span className={`font-logo text-2xl font-extrabold tracking-wide text-carbon ${claseTexto}`}>RADAR</span>
      )}
    </span>
  )
}

/**
 * Código QR SIMULADO: un dibujo con aspecto de QR (no se puede escanear).
 * Siempre genera el mismo dibujo para el mismo texto, así cada feria tiene "su" QR.
 */
type Props = { texto: string; etiqueta: string }

const N = 21 // un QR real pequeño tiene 21×21 módulos

/** Convierte el texto en un número para variar el dibujo */
function semilla(texto: string): number {
  let h = 2166136261
  for (const c of texto) h = Math.imul(h ^ c.charCodeAt(0), 16777619)
  return h >>> 0
}

/** ¿Este módulo cae dentro de uno de los tres cuadros de las esquinas? */
function enEsquina(x: number, y: number): boolean {
  const dentro = (cx: number, cy: number) => x >= cx && x < cx + 7 && y >= cy && y < cy + 7
  return dentro(0, 0) || dentro(N - 7, 0) || dentro(0, N - 7)
}

/** Calcula qué módulos (cuadraditos) van pintados. Mismo texto → mismo dibujo. */
function calcularModulos(texto: string): { x: number; y: number }[] {
  let s = semilla(texto)
  const azar = () => {
    // Generador pseudoaleatorio simple
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
  const modulos: { x: number; y: number }[] = []
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      if (!enEsquina(x, y) && azar() > 0.52) modulos.push({ x, y })
    }
  }
  return modulos
}

export default function CodigoQR({ texto, etiqueta }: Props) {
  const modulos = calcularModulos(texto)

  const esquina = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="#1F5662" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="#FFFFFF" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#1F5662" />
    </g>
  )

  return (
    <svg viewBox={`-2 -2 ${N + 4} ${N + 4}`} role="img" aria-label={etiqueta} className="h-auto w-full" shapeRendering="crispEdges">
      <rect x="-2" y="-2" width={N + 4} height={N + 4} fill="#FFFFFF" />
      {modulos.map((m) => (
        <rect key={`${m.x}-${m.y}`} x={m.x} y={m.y} width="1" height="1" fill="#1F5662" />
      ))}
      {esquina(0, 0)}
      {esquina(N - 7, 0)}
      {esquina(0, N - 7)}
      {/* Centro con la cruz andina, como sello de RADAR */}
      <rect x="8" y="8" width="5" height="5" fill="#FFFFFF" />
      <path d="M9.8 8.6h1.4v1.2h1.2v1.4h-1.2v1.2H9.8v-1.2H8.6V9.8h1.2z" fill="#A6372B" />
    </svg>
  )
}

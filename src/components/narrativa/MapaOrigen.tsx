import type { Lugar } from '../../data/tipos'

/**
 * Mapa ESQUEMÁTICO del Perú (contorno simplificado) con dos puntos:
 * 1 = origen del insumo, 2 = taller. Una línea punteada los une.
 */
type Props = {
  insumo: Lugar
  taller: Lugar
}

/** Convierte latitud/longitud en coordenadas x, y del dibujo */
const proyectar = (lat: number, lon: number) => ({
  x: (lon + 81.6) * 14,
  y: -lat * 14 + 4,
})

/** Contorno aproximado del Perú (longitud, latitud), en sentido horario desde Tumbes */
const CONTORNO: [number, number][] = [
  [-80.4, -3.5], [-80.1, -4.3], [-79.3, -4.6], [-78.6, -4.4], [-78.3, -3.3], [-77.0, -2.8],
  [-75.6, -1.6], [-75.2, -0.1], [-73.6, -1.3], [-72.8, -2.4], [-71.6, -2.3], [-70.1, -4.2],
  [-72.9, -5.1], [-73.9, -7.3], [-73.0, -9.4], [-72.3, -9.5], [-70.6, -9.4], [-70.6, -11.0],
  [-69.6, -10.9], [-68.7, -12.5], [-68.9, -14.0], [-69.4, -15.4], [-69.0, -16.3], [-69.6, -17.3],
  [-70.4, -18.35], [-71.4, -17.7], [-72.5, -16.7], [-74.0, -15.8], [-75.5, -14.8], [-76.3, -13.8],
  [-76.8, -12.4], [-77.2, -12.0], [-77.7, -11.0], [-78.6, -9.1], [-79.0, -8.1], [-79.9, -6.8],
  [-81.0, -5.9], [-81.3, -4.7], [-81.0, -4.1],
]

const RUTA = CONTORNO.map(([lon, lat], i) => {
  const p = proyectar(lat, lon)
  return `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`
}).join(' ') + 'Z'

type Punto = { x: number; y: number }

/**
 * Si los dos puntos quedan muy juntos (por ejemplo, dos pueblos de Cusco),
 * los alejamos un poco para que se lean ambos números. Es un mapa esquemático.
 */
function separar(a: Punto, b: Punto, minimo = 20): [Punto, Punto] {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const distancia = Math.hypot(dx, dy)
  if (distancia >= minimo) return [a, b]
  // Dirección en la que empujamos (si coinciden, en horizontal)
  const ux = distancia === 0 ? 1 : dx / distancia
  const uy = distancia === 0 ? 0 : dy / distancia
  const empuje = (minimo - distancia) / 2
  return [
    { x: a.x - ux * empuje, y: a.y - uy * empuje },
    { x: b.x + ux * empuje, y: b.y + uy * empuje },
  ]
}

export default function MapaOrigen({ insumo, taller }: Props) {
  const [a, b] = separar(proyectar(insumo.lat, insumo.lon), proyectar(taller.lat, taller.lon))
  const descripcion = `Mapa esquemático del Perú. Punto 1, insumo: ${insumo.lugar}, ${insumo.region}. Punto 2, taller: ${taller.lugar}, ${taller.region}.`

  return (
    <figure className="grid items-center gap-4 rounded-tarjeta border border-algodon-oscuro bg-white p-4 sm:grid-cols-[210px_1fr]">
      <svg viewBox="0 0 190 268" className="mx-auto w-52" role="img" aria-label={descripcion}>
        <path d={RUTA} fill="#ECE6D8" stroke="#4A433D" strokeWidth="1.2" strokeLinejoin="round" />
        <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#1F5662" strokeWidth="2" strokeDasharray="4 3" />
        {[
          { p: a, n: '1', color: '#D39A2F', texto: '#1A1714' },
          { p: b, n: '2', color: '#1F5662', texto: '#FFFFFF' },
        ].map(({ p, n, color, texto }) => (
          <g key={n}>
            <circle cx={p.x} cy={p.y} r="8" fill={color} stroke="#F7F4EC" strokeWidth="2" />
            <text x={p.x} y={p.y + 3.5} textAnchor="middle" fontSize="10" fontWeight="700" fill={texto}>
              {n}
            </text>
          </g>
        ))}
      </svg>

      <figcaption>
        <ol className="space-y-3 text-sm">
          <li className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ocre text-xs font-bold text-carbon">1</span>
            <span>
              <span className="block font-bold text-carbon">Insumo</span>
              <span className="text-gris-calido">
                {insumo.lugar}, {insumo.region}
              </span>
            </span>
          </li>
          <li className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-laguna text-xs font-bold text-white">2</span>
            <span>
              <span className="block font-bold text-carbon">Taller</span>
              <span className="text-gris-calido">
                {taller.lugar}, {taller.region}
              </span>
            </span>
          </li>
        </ol>
        <p className="mt-3 font-nota text-lg text-gris-calido">mapa esquemático, no a escala</p>
      </figcaption>
    </figure>
  )
}

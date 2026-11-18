import type { Feria } from '../../data/tipos'

/**
 * Mapa ESQUEMÁTICO de Lima con un pin por feria.
 * El dibujo (mar, costa, río Rímac y nombres de distritos) es decorativo;
 * los pines son botones reales que se pueden usar con teclado.
 */
type Props = {
  ferias: Feria[]
  seleccionada: string
  escaneadas: string[]
  onElegir: (id: string) => void
}

/** Nombres de distritos de referencia (posición en %) */
const DISTRITOS = [
  { nombre: 'Callao', x: 9, y: 20 },
  { nombre: 'Rímac', x: 52, y: 18 },
  { nombre: 'San Isidro', x: 50, y: 52 },
  { nombre: 'Surquillo', x: 60, y: 62 },
  { nombre: 'Santiago de Surco', x: 72, y: 76 },
  { nombre: 'Chorrillos', x: 52, y: 90 },
  { nombre: 'SJL', x: 80, y: 10 },
  { nombre: 'Océano Pacífico', x: 14, y: 70 },
]

export default function MapaLima({ ferias, seleccionada, escaneadas, onElegir }: Props) {
  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-bloque border border-algodon-oscuro bg-white">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* Mar */}
        <path d="M0 0 H20 C21 12 22 22 9 30 C14 34 24 34 30 46 C34 56 36 64 39 72 C41 80 39 90 44 100 H0 Z" fill="#DCE8EA" />
        {/* Línea de costa */}
        <path
          d="M20 0 C21 12 22 22 9 30 C14 34 24 34 30 46 C34 56 36 64 39 72 C41 80 39 90 44 100"
          fill="none"
          stroke="#1F5662"
          strokeWidth="0.6"
        />
        {/* Río Rímac */}
        <path d="M98 14 C80 18 70 26 58 25 C50 24 44 28 34 27 C26 26 22 28 16 30" fill="none" stroke="#1F5662" strokeWidth="1" strokeDasharray="2 1.2" opacity="0.7" />
        {/* Vías principales (decorativas) */}
        <path d="M46 28 L48 100 M30 46 L95 46 M40 72 L95 66" stroke="#4A433D" strokeOpacity="0.15" strokeWidth="0.8" />
        {DISTRITOS.map((d) => (
          <text key={d.nombre} x={d.x} y={d.y} fontSize="3" fill="#4A433D" textAnchor="middle" fontStyle={d.nombre.startsWith('Océano') ? 'italic' : undefined}>
            {d.nombre}
          </text>
        ))}
      </svg>

      {/* Pines (botones) */}
      {ferias.map((f) => {
        const activa = f.id === seleccionada
        const escaneada = escaneadas.includes(f.id)
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onElegir(f.id)}
            aria-pressed={activa}
            aria-label={`${f.nombre}, ${f.distrito}${escaneada ? ', ya escaneada' : ''}`}
            className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-full place-items-center rounded-full"
            style={{ left: `${f.pin.x}%`, top: `${f.pin.y}%` }}
          >
            <svg
              viewBox="0 0 24 32"
              className={`drop-shadow transition-transform ${activa ? 'h-11 w-9 scale-110' : 'h-9 w-7 group-hover:scale-110'}`}
              aria-hidden="true"
            >
              <path
                d="M12 1C6 1 1.5 5.5 1.5 11.5 1.5 19 12 31 12 31s10.5-12 10.5-19.5C22.5 5.5 18 1 12 1z"
                fill={activa ? '#A6372B' : escaneada ? '#1F5662' : '#1A1714'}
                stroke="#F7F4EC"
                strokeWidth="1.5"
              />
              {escaneada ? (
                <path d="M7.5 11.5l3 3 6-6" fill="none" stroke="#D39A2F" strokeWidth="2.4" strokeLinecap="round" />
              ) : (
                <circle cx="12" cy="11.5" r="3.5" fill="#D39A2F" />
              )}
            </svg>
          </button>
        )
      })}

      <p className="absolute bottom-2 right-3 font-nota text-lg text-gris-calido">mapa esquemático</p>
    </div>
  )
}

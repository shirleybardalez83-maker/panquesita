import { ATMOSFERAS } from '../../data/atmosferas'
import type { AtmosferaId } from '../../data/tipos'

/**
 * Botones de filtro por atmósfera.
 * aria-pressed indica al lector de pantalla cuál está activo.
 */
type Props = {
  activa: AtmosferaId | null // null = "Todas"
  onCambiar: (id: AtmosferaId | null) => void
}

export default function ChipsAtmosfera({ activa, onCambiar }: Props) {
  const opciones: { id: AtmosferaId | null; nombre: string }[] = [
    { id: null, nombre: 'Todas' },
    ...ATMOSFERAS.map((a) => ({ id: a.id, nombre: a.nombre })),
  ]

  return (
    <div role="group" aria-label="Filtrar por atmósfera" className="flex flex-wrap gap-2">
      {opciones.map((o) => {
        const presionado = o.id === activa
        return (
          <button
            key={o.nombre}
            type="button"
            aria-pressed={presionado}
            onClick={() => onCambiar(o.id)}
            className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              presionado
                ? 'border-carbon bg-carbon text-algodon'
                : 'border-gris-calido/40 bg-white text-carbon hover:border-carbon'
            }`}
          >
            {o.nombre}
          </button>
        )
      })}
    </div>
  )
}

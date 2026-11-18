/**
 * Barra horizontal para mostrar una cantidad (gráfico de una sola serie).
 * - Un solo tono (laguna), extremos redondeados y pista suave detrás.
 * - El número siempre va escrito al lado: el dato nunca depende solo del color.
 */
type Props = {
  etiqueta: string
  /** Texto del valor que se muestra (ej. "38 %" o "12") */
  valorTexto: string
  /** Porcentaje del ancho de la barra (0–100) */
  porcentaje: number
  /** Resalta la fila (por ejemplo, "tu voto") */
  destacada?: boolean
  detalle?: string
}

export default function BarraDato({ etiqueta, valorTexto, porcentaje, destacada = false, detalle }: Props) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className={destacada ? 'font-extrabold text-carbon' : 'font-semibold text-carbon'}>
          {etiqueta}
          {detalle && <span className="ml-2 rounded-full bg-ocre px-2 py-0.5 text-xs font-bold text-carbon">{detalle}</span>}
        </span>
        <span className="shrink-0 font-bold tabular-nums text-carbon">{valorTexto}</span>
      </div>
      <div className="mt-1.5 h-2.5 overflow-hidden rounded bg-algodon-oscuro" aria-hidden="true">
        <div
          className="h-full rounded bg-laguna transition-[width] duration-700 ease-out"
          style={{ width: `${Math.max(0, Math.min(100, porcentaje))}%` }}
        />
      </div>
    </div>
  )
}

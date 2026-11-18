/**
 * "Pasaporte del producto": barra de trazabilidad insumo → taller → diseño → feria.
 * Llega al 100 % solo cuando la persona escanea el QR en una feria.
 */
type Etapa = { nombre: string; detalle: string }

type Props = {
  etapas: [Etapa, Etapa, Etapa, Etapa]
  /** true cuando ya se escaneó el QR en una feria */
  escaneada: boolean
  /** Nivel del título según dónde se muestre */
  nivelTitulo?: 'h2' | 'h3'
}

export default function BarraTrazabilidad({ etapas, escaneada, nivelTitulo = 'h3' }: Props) {
  const Titulo = nivelTitulo
  const completadas = escaneada ? 4 : 3
  const porcentaje = completadas * 25

  return (
    <section aria-labelledby="titulo-trazabilidad" className="rounded-tarjeta bg-laguna p-5 text-white">
      <div className="flex items-baseline justify-between gap-3">
        <Titulo id="titulo-trazabilidad" className="font-bold">
          Pasaporte del producto
        </Titulo>
        <p className="text-2xl font-extrabold">{porcentaje}%</p>
      </div>

      <div
        role="progressbar"
        aria-label="Trazabilidad de la prenda"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={porcentaje}
        className="mt-3 h-2 overflow-hidden rounded-full bg-white/20"
      >
        <div className="h-full rounded-full bg-ocre transition-all duration-500" style={{ width: `${porcentaje}%` }} />
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {etapas.map((etapa, i) => {
          const hecha = i < completadas
          return (
            <li key={etapa.nombre} className="flex gap-2">
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${
                  hecha ? 'bg-ocre text-carbon' : 'border border-dashed border-white/70'
                }`}
                aria-hidden="true"
              >
                {hecha ? '✓' : i + 1}
              </span>
              <span className="text-sm">
                <span className="block font-bold">
                  {etapa.nombre}
                  <span className="solo-lector">{hecha ? ' (verificado)' : ' (pendiente)'}</span>
                </span>
                <span className="text-white/85">{etapa.detalle}</span>
              </span>
            </li>
          )
        })}
      </ol>

      {!escaneada && (
        <p className="mt-4 rounded-suave bg-white/10 px-3 py-2 text-sm">
          Escanea el QR de esta prenda en una feria para completar su pasaporte.
        </p>
      )}
    </section>
  )
}

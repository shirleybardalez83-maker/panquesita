import { useEffect, useState } from 'react'
import { DURACION_NARRATIVA } from '../../config'
import { formatearTiempo } from '../../utils/fechas'

/**
 * Reproductor de audio SIMULADO: no hay archivo de sonido todavía,
 * solo un contador que avanza para mostrar cómo se vería la experiencia.
 * La cita escrita debajo funciona como transcripción (accesibilidad).
 */
type Props = {
  titulo?: string
  duracion?: number
  /** Texto pequeño bajo el reproductor */
  nota?: string
}

/** Alturas de las barras decorativas de "onda de sonido" */
const ONDA = [6, 14, 9, 18, 12, 22, 8, 16, 20, 10, 15, 7, 19, 11, 17, 9, 13, 21, 8, 14, 18, 10, 16, 12]

export default function ReproductorAudio({
  titulo = 'Mi inspiración',
  duracion = DURACION_NARRATIVA,
  nota = 'Audio de demostración: la narración real llegará con cada marca.',
}: Props) {
  const [segundos, setSegundos] = useState(0)
  const [reproduciendo, setReproduciendo] = useState(false)
  const terminado = segundos >= duracion
  // "activo" = está sonando de verdad (al llegar al final se detiene solo)
  const activo = reproduciendo && !terminado

  // Mientras está activo, sumamos 0.25 s cada 250 ms
  useEffect(() => {
    if (!activo) return
    const intervalo = setInterval(() => {
      setSegundos((s) => Math.min(s + 0.25, duracion))
    }, 250)
    return () => clearInterval(intervalo)
  }, [activo, duracion])

  function alternar() {
    if (terminado) {
      setSegundos(0)
      setReproduciendo(true)
    } else {
      setReproduciendo((r) => !r)
    }
  }

  const porcentaje = (segundos / duracion) * 100
  const etiquetaBoton = terminado ? 'Volver a escuchar' : activo ? 'Pausar' : 'Reproducir'

  return (
    <div className="rounded-tarjeta bg-carbon p-4 text-algodon">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={alternar}
          aria-label={`${etiquetaBoton}: ${titulo} (${duracion} segundos)`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-arcilla text-white hover:bg-arcilla-oscura focus-visible:outline-ocre"
        >
          {activo ? (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <rect x="3" y="2" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="11" y="2" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path d="M4 2l12 7-12 7z" fill="currentColor" />
            </svg>
          )}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <p className="font-bold">
              {titulo} <span className="font-normal text-algodon/80">({duracion} s)</span>
            </p>
            <p className="shrink-0 font-mono text-sm text-algodon/80" aria-hidden="true">
              {formatearTiempo(segundos)} / {formatearTiempo(duracion)}
            </p>
          </div>

          {/* Onda decorativa: las barras ya reproducidas se pintan en ocre */}
          <div className="mt-2 flex h-6 items-end gap-[3px]" aria-hidden="true">
            {ONDA.map((h, i) => (
              <span
                key={i}
                className={`w-full rounded-sm transition-colors ${
                  (i / ONDA.length) * 100 < porcentaje ? 'bg-ocre' : 'bg-algodon/25'
                }`}
                style={{ height: h }}
              />
            ))}
          </div>

          {/* Barra de progreso accesible */}
          <div
            role="progressbar"
            aria-label="Progreso del audio"
            aria-valuemin={0}
            aria-valuemax={duracion}
            aria-valuenow={Math.floor(segundos)}
            aria-valuetext={`${formatearTiempo(segundos)} de ${formatearTiempo(duracion)}`}
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-algodon/20"
          >
            <div className="h-full bg-ocre" style={{ width: `${porcentaje}%` }} />
          </div>
        </div>
      </div>
      <p className="mt-3 text-xs text-algodon/80">{nota}</p>
    </div>
  )
}

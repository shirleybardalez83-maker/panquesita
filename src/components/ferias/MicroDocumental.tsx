import type { Feria } from '../../data/tipos'
import PatronTextil from '../marca/PatronTextil'
import ReproductorAudio from '../narrativa/ReproductorAudio'

/**
 * Micro-documental desbloqueado al escanear en una feria.
 * Video SIMULADO: un póster con patrón textil y el reproductor de demostración.
 */
export default function MicroDocumental({ feria }: { feria: Feria }) {
  return (
    <section aria-labelledby={`doc-${feria.id}`} className="overflow-hidden rounded-tarjeta border border-algodon-oscuro bg-white">
      <div className="relative aspect-video">
        <PatronTextil className="absolute inset-0" fondo="#1A1714" escala={56} />
        {/* Franja sólida para que el título se lea sobre el patrón */}
        <div className="absolute inset-x-0 bottom-0 bg-carbon/90 p-4 text-algodon">
          <span className="rounded-full bg-ocre px-3 py-1 text-xs font-bold text-carbon">Micro-documental desbloqueado</span>
          <h3 id={`doc-${feria.id}`} className="mt-2 font-editorial text-3xl leading-tight">
            {feria.documental.titulo}
          </h3>
        </div>
      </div>
      <div className="space-y-3 p-4">
        <p className="text-gris-calido">{feria.documental.descripcion}</p>
        <ReproductorAudio titulo="Ver micro-documental" duracion={90} nota="Video de demostración: el documental real llegará con cada feria." />
      </div>
    </section>
  )
}

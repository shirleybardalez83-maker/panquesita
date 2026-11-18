import { Link, useLocation } from 'react-router-dom'
import { obtenerDisenador } from '../../data/disenadores'
import type { Prenda } from '../../data/tipos'
import Imagen from '../ui/Imagen'
import { EtiquetaAtmosfera } from '../ui/Etiquetas'

/**
 * Tarjeta de una prenda en el feed.
 * Al hacer clic abre la narrativa como modal: guardamos la página actual
 * en `state.fondo` para dibujarla detrás.
 */
export default function TarjetaPrenda({ prenda }: { prenda: Prenda }) {
  const location = useLocation()
  const disenador = obtenerDisenador(prenda.disenador)

  return (
    <article className="group relative overflow-hidden rounded-tarjeta border border-algodon-oscuro bg-white transition-shadow hover:shadow-lg">
      <Imagen
        src={prenda.imagen}
        alt={`${prenda.nombre}, de ${disenador?.marca ?? 'marca independiente'}`}
        nombre={prenda.nombre}
        className="aspect-[4/5] w-full transition-transform duration-500 group-hover:scale-[1.02]"
      />
      <div className="space-y-2 p-4">
        <EtiquetaAtmosfera id={prenda.atmosfera} />
        <h3 className="font-editorial text-2xl leading-tight text-carbon">
          {/* El enlace "se estira" (after:absolute) para que toda la tarjeta sea clicable */}
          <Link
            to={`/prenda/${prenda.id}`}
            state={{ fondo: location }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-tarjeta focus-visible:after:outline focus-visible:after:outline-3 focus-visible:after:outline-laguna"
          >
            {prenda.nombre}
          </Link>
        </h3>
        {disenador && (
          <p className="text-sm text-gris-calido">
            {disenador.nombre} · {disenador.marca}
          </p>
        )}
        <p className="font-nota text-lg text-arcilla" aria-hidden="true">
          escuchar su historia →
        </p>
      </div>
    </article>
  )
}

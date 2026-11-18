import { Link } from 'react-router-dom'
import type { Disenador } from '../../data/tipos'
import { prendasDeDisenador } from '../../data/prendas'
import Imagen from '../ui/Imagen'
import Avatar from '../ui/Avatar'
import { EtiquetaAtmosfera, InsigniaDestacado } from '../ui/Etiquetas'
import BotonSeguir from './BotonSeguir'

/** Tarjeta de un diseñador (directorio e Inicio). */
type Props = {
  disenador: Disenador
  /** Nivel del título: h2 en el directorio, h3 dentro de otra sección */
  nivel?: 'h2' | 'h3'
}

export default function TarjetaDisenador({ disenador: d, nivel = 'h3' }: Props) {
  const Titulo = nivel
  const piezas = prendasDeDisenador(d.id).length

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-tarjeta border border-algodon-oscuro bg-white">
      <Imagen src={d.portada} alt={`Portada de ${d.marca}`} nombre={d.marca} className="aspect-[16/9] w-full" />
      <div className="flex flex-1 flex-col gap-3 p-5 pt-0">
        <div className="relative z-10 -mt-8 flex items-end justify-between gap-3">
          <Avatar disenador={d} />
          {d.destacado && <InsigniaDestacado className="mb-1" />}
        </div>

        <div>
          <Titulo className="font-editorial text-2xl text-carbon">{d.nombre}</Titulo>
          <p className="text-sm text-gris-calido">
            {d.marca} · {d.ciudad}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-gris-calido">{d.descripcionCorta}</p>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gris-calido">
          <EtiquetaAtmosfera id={d.atmosfera} />
          <span>
            {piezas} {piezas === 1 ? 'pieza' : 'piezas'} en RADAR
          </span>
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link
            to={`/disenadores/${d.id}`}
            className="inline-flex min-h-11 items-center rounded-full bg-arcilla px-5 py-2 text-sm font-bold text-white hover:bg-arcilla-oscura"
          >
            Ver perfil<span className="solo-lector"> de {d.nombre}</span>
          </Link>
          <BotonSeguir disenador={d} />
        </div>
      </div>
    </article>
  )
}

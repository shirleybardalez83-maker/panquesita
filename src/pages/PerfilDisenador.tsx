import { Link, useParams } from 'react-router-dom'
import { obtenerDisenador } from '../data/disenadores'
import { feriasDeDisenador } from '../data/ferias'
import { prendasDeDisenador } from '../data/prendas'
import type { Disenador } from '../data/tipos'
import { usePasaporte } from '../hooks/usePasaporte'
import { formatearFecha, partesFecha } from '../utils/fechas'
import Imagen from '../components/ui/Imagen'
import Avatar from '../components/ui/Avatar'
import { EtiquetaAtmosfera, InsigniaDestacado } from '../components/ui/Etiquetas'
import BotonSeguir from '../components/disenadores/BotonSeguir'
import ReproductorAudio from '../components/narrativa/ReproductorAudio'
import TarjetaPrenda from '../components/prendas/TarjetaPrenda'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import TituloPagina from '../components/ui/TituloPagina'

/** Perfil completo de un diseñador (/disenadores/:id). */
export default function PerfilDisenador() {
  const { id = '' } = useParams()
  const d = obtenerDisenador(id)

  if (!d) {
    return (
      <>
        <TituloPagina texto="Diseñador no encontrado" />
        <EncabezadoPagina nota="fuera del radar" titulo="Diseñador no encontrado">
          Puede que el enlace esté mal escrito.
        </EncabezadoPagina>
        <Link to="/disenadores" className="font-bold text-arcilla underline underline-offset-4">
          Ver el directorio
        </Link>
      </>
    )
  }

  return (
    <article>
      <TituloPagina texto={`${d.nombre} · ${d.marca}`} />
      <Cabecera d={d} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        {/* Su voz: audio, cita y biografía */}
        <section aria-labelledby="titulo-historia" className="space-y-5">
          <h2 id="titulo-historia" className="font-editorial text-4xl text-carbon">
            Su historia
          </h2>
          <ReproductorAudio titulo="Mi historia" />
          <blockquote className="border-l-4 border-arcilla pl-4">
            <p className="font-editorial text-2xl leading-snug text-carbon">“{d.cita}”</p>
          </blockquote>
          <p className="text-lg leading-relaxed text-gris-calido">{d.biografia}</p>
        </section>

        {/* Taller e insumos */}
        <section aria-labelledby="titulo-taller" className="space-y-4">
          <h2 id="titulo-taller" className="font-editorial text-4xl text-carbon">
            Taller e insumos
          </h2>
          <div className="rounded-tarjeta border border-algodon-oscuro bg-white p-5">
            <h3 className="font-bold text-carbon">{d.taller.nombre}</h3>
            <p className="text-sm font-semibold text-laguna">{d.taller.lugar}</p>
            <p className="mt-2 leading-relaxed text-gris-calido">{d.taller.descripcion}</p>
          </div>
          <div className="rounded-tarjeta border border-algodon-oscuro bg-white p-5">
            <h3 className="font-bold text-carbon">Insumos</h3>
            <ul className="mt-2 space-y-2">
              {d.insumos.map((insumo) => (
                <li key={insumo} className="flex gap-2 text-gris-calido">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-ocre" />
                  {insumo}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <ProximasFerias d={d} />
      <Coleccion d={d} />
    </article>
  )
}

/** Banner, avatar grande, datos y botones */
function Cabecera({ d }: { d: Disenador }) {
  const { estaSiguiendo } = usePasaporte()
  // Si le sigues, el contador muestra un seguidor más (tú)
  const seguidores = d.seguidores + (estaSiguiendo(d.id) ? 1 : 0)

  return (
    <header>
      <Imagen
        src={d.banner}
        alt={`Banner de ${d.marca}`}
        nombre={d.marca}
        className="aspect-[2/1] w-full rounded-bloque sm:aspect-[3/1]"
      />
      <div className="relative z-10 px-2 sm:px-6">
        {/* Fila 1: avatar (sube sobre el banner) y botones */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Avatar disenador={d} tamano="lg" className="-mt-14" />
          <div className="flex flex-wrap gap-2">
            <BotonSeguir disenador={d} />
            <a
              href="#donde-encontrarle"
              className="inline-flex min-h-11 items-center rounded-full border-2 border-laguna px-5 py-2 text-sm font-bold text-laguna hover:bg-laguna hover:text-white"
            >
              Dónde encontrarle
            </a>
          </div>
        </div>
        {/* Fila 2: datos */}
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-2">
            <EtiquetaAtmosfera id={d.atmosfera} />
            {d.destacado && <InsigniaDestacado />}
          </div>
          <h1 className="mt-2 font-editorial text-5xl leading-tight text-carbon sm:text-6xl">{d.nombre}</h1>
          <p className="text-gris-calido">
            {d.marca} · {d.ciudad} ·{' '}
            <span className="font-semibold text-carbon">{seguidores.toLocaleString('es-PE')} seguidores</span>
          </p>
        </div>
      </div>
    </header>
  )
}

/** Ferias donde participa, con enlace al detalle */
function ProximasFerias({ d }: { d: Disenador }) {
  const ferias = feriasDeDisenador(d.id)

  return (
    <section id="donde-encontrarle" aria-labelledby="titulo-ferias" className="mt-14 scroll-mt-36">
      <p className="font-nota text-2xl text-arcilla">del feed a la feria</p>
      <h2 id="titulo-ferias" className="mb-5 font-editorial text-4xl text-carbon">
        Próximas ferias
      </h2>
      {ferias.length === 0 ? (
        <p className="text-gris-calido">Por ahora no tiene ferias programadas.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {ferias.map((f) => {
            const { dia, mes } = partesFecha(f.fecha)
            return (
              <li key={f.id} className="flex gap-4 rounded-tarjeta border border-algodon-oscuro bg-white p-4">
                {/* Bloque de fecha estilo calendario */}
                <div className="grid w-16 shrink-0 place-items-center rounded-suave bg-laguna py-2 text-white" aria-hidden="true">
                  <span className="text-2xl font-extrabold leading-none">{dia}</span>
                  <span className="text-xs uppercase">{mes}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-carbon">{f.nombre}</h3>
                  <p className="text-sm text-gris-calido">
                    {f.distrito} · {formatearFecha(f.fecha, true)} · {f.horario}
                  </p>
                  <p className="mt-1 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full bg-ocre-suave px-2 py-0.5 font-bold text-carbon">Entrada libre</span>
                    <Link
                      to={`/ferias?feria=${f.id}`}
                      className="inline-flex min-h-11 items-center font-bold text-laguna underline underline-offset-4"
                    >
                      Ver feria<span className="solo-lector"> {f.nombre}</span>
                    </Link>
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

/** Prendas del diseñador en RADAR (abren la narrativa como modal) */
function Coleccion({ d }: { d: Disenador }) {
  const prendas = prendasDeDisenador(d.id)
  if (prendas.length === 0) return null

  return (
    <section aria-labelledby="titulo-coleccion" className="mt-14">
      <h2 id="titulo-coleccion" className="mb-5 font-editorial text-4xl text-carbon">
        Colección en RADAR
      </h2>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {prendas.map((p) => (
          <li key={p.id}>
            <TarjetaPrenda prenda={p} />
          </li>
        ))}
      </ul>
    </section>
  )
}

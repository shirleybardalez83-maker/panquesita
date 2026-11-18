import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { ATMOSFERAS, obtenerAtmosfera } from '../data/atmosferas'
import { DISENADORES_SEMANA, obtenerDisenador } from '../data/disenadores'
import { NARRATIVA_SEMANA_ID, PRENDAS, obtenerPrenda } from '../data/prendas'
import type { AtmosferaId } from '../data/tipos'
import { MAX_PRENDAS_POR_ATMOSFERA } from '../config'
import ChipsAtmosfera from '../components/prendas/ChipsAtmosfera'
import TarjetaPrenda from '../components/prendas/TarjetaPrenda'
import Imagen from '../components/ui/Imagen'
import TarjetaDisenador from '../components/disenadores/TarjetaDisenador'
import PatronTextil from '../components/marca/PatronTextil'
import TituloPagina from '../components/ui/TituloPagina'

/** Página de inicio: portada, curaduría por atmósferas y diseñadores de la semana. */
export default function Inicio() {
  return (
    <>
      <TituloPagina />
      <Portada />
      <Curaduria />
      <DisenadoresSemana />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Portada con titular y "Narrativa de la semana"                     */
/* ------------------------------------------------------------------ */
function Portada() {
  const location = useLocation()
  const prenda = obtenerPrenda(NARRATIVA_SEMANA_ID)!
  const disenador = obtenerDisenador(prenda.disenador)!

  return (
    <section className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
      <div>
        <p className="font-nota text-2xl text-arcilla">atmósferas curadas — no algorítmico</p>
        <h1 className="mt-1 font-editorial text-5xl leading-[1.05] text-carbon sm:text-6xl lg:text-7xl">
          Moda peruana con historia, no con algoritmo
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-gris-calido">
          Descubre marcas independientes de Lima y de todo el Perú, escucha quién hizo cada prenda y encuéntrala en
          una feria. Sin scroll infinito y sin pagar nada.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#curaduria"
            className="rounded-full bg-arcilla px-6 py-3 font-bold text-white hover:bg-arcilla-oscura"
          >
            Explorar atmósferas
          </a>
          <Link
            to="/ferias"
            className="rounded-full border-2 border-carbon px-6 py-3 font-bold text-carbon hover:bg-carbon hover:text-algodon"
          >
            Ver ferias
          </Link>
        </div>
      </div>

      {/* Tarjeta grande: Narrativa de la semana */}
      <article className="relative overflow-hidden rounded-bloque border border-algodon-oscuro bg-white shadow-sm">
        <div className="grid sm:grid-cols-2">
          <Imagen
            src={prenda.imagen}
            alt={`${prenda.nombre}, de ${disenador.marca}`}
            nombre={prenda.nombre}
            className="aspect-[4/5] w-full"
          />
          <div className="flex flex-col gap-3 p-5 sm:p-6">
            <span className="self-start rounded-full bg-ocre px-3 py-1 text-xs font-bold text-carbon">
              Narrativa de la semana
            </span>
            <h2 className="font-editorial text-3xl leading-tight text-carbon sm:text-4xl">{prenda.nombre}</h2>
            <p className="text-sm text-gris-calido">
              {disenador.nombre} · {disenador.marca}
            </p>
            <blockquote className="border-l-4 border-arcilla pl-3 font-editorial text-xl leading-snug text-carbon">
              “{prenda.cita}”
            </blockquote>
            <Link
              to={`/prenda/${prenda.id}`}
              state={{ fondo: location }}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-carbon px-5 py-3 font-bold text-algodon hover:bg-gris-calido"
            >
              <svg width="14" height="14" viewBox="0 0 18 18" aria-hidden="true">
                <path d="M4 2l12 7-12 7z" fill="currentColor" />
              </svg>
              Escuchar la narrativa (45 s)
            </Link>
          </div>
        </div>
      </article>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Curaduría: chips de atmósfera + grilla + fin de la curaduría        */
/* ------------------------------------------------------------------ */
function Curaduria() {
  // La atmósfera elegida vive en la dirección (?atmosfera=...) para que "atrás" funcione
  const [params, setParams] = useSearchParams()
  const valor = params.get('atmosfera')
  const activa = ATMOSFERAS.some((a) => a.id === valor) ? (valor as AtmosferaId) : null

  const prendas = PRENDAS.filter((p) => !activa || p.atmosfera === activa).slice(0, MAX_PRENDAS_POR_ATMOSFERA)

  function cambiar(id: AtmosferaId | null) {
    setParams(id ? { atmosfera: id } : {}, { preventScrollReset: true })
  }

  return (
    <section id="curaduria" aria-labelledby="titulo-curaduria" className="mt-16 scroll-mt-32">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-nota text-2xl text-arcilla">elige una atmósfera</p>
          <h2 id="titulo-curaduria" className="font-editorial text-4xl text-carbon sm:text-5xl">
            Curaduría de hoy
          </h2>
        </div>
        <ChipsAtmosfera activa={activa} onCambiar={cambiar} />
      </div>

      {/* aria-live: el lector de pantalla anuncia el cambio al filtrar */}
      <p aria-live="polite" className="mb-6 max-w-3xl text-gris-calido">
        {activa ? obtenerAtmosfera(activa).descripcion : 'Todas las atmósferas de esta semana.'}{' '}
        <span className="font-semibold text-carbon">
          {prendas.length} {prendas.length === 1 ? 'prenda' : 'prendas'}.
        </span>
      </p>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {prendas.map((p) => (
          <li key={p.id}>
            <TarjetaPrenda prenda={p} />
          </li>
        ))}
      </ul>

      <FinCuraduria />
    </section>
  )
}

/** Mensaje de cierre: aquí termina el feed (no hay scroll infinito). */
function FinCuraduria() {
  return (
    <div className="mt-10 overflow-hidden rounded-bloque border border-algodon-oscuro bg-white">
      <div className="h-6">
        <PatronTextil escala={24} />
      </div>
      <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <h3 className="font-editorial text-3xl text-carbon">Fin de la curaduría de hoy</h3>
          <p className="mt-1 max-w-xl text-gris-calido">
            Aquí no hay scroll infinito. Mañana llega una nueva selección. Mientras tanto, conoce a quienes las hacen o
            visítales en una feria.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Link to="/disenadores" className="rounded-full bg-carbon px-5 py-3 font-bold text-algodon hover:bg-gris-calido">
            Ver diseñadores
          </Link>
          <Link
            to="/ferias"
            className="rounded-full border-2 border-laguna px-5 py-3 font-bold text-laguna hover:bg-laguna hover:text-white"
          >
            Ir a una feria
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Diseñadores de la semana                                            */
/* ------------------------------------------------------------------ */
function DisenadoresSemana() {
  const lista = DISENADORES_SEMANA.map(obtenerDisenador).filter((d) => d !== undefined)

  return (
    <section aria-labelledby="titulo-semana" className="mt-16">
      <p className="font-nota text-2xl text-arcilla">las manos detrás</p>
      <h2 id="titulo-semana" className="mb-6 font-editorial text-4xl text-carbon sm:text-5xl">
        Diseñadores de la semana
      </h2>

      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((d) => (
          <li key={d.id}>
            <TarjetaDisenador disenador={d} />
          </li>
        ))}
      </ul>
    </section>
  )
}

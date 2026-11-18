import { useRef } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FERIAS_POR_FECHA, obtenerFeria } from '../data/ferias'
import { obtenerDisenador } from '../data/disenadores'
import type { Feria } from '../data/tipos'
import { PUNTOS } from '../config'
import { usePasaporte } from '../hooks/usePasaporte'
import { formatearFecha, mayusculaInicial, partesFecha } from '../utils/fechas'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import Avatar from '../components/ui/Avatar'
import MapaLima from '../components/ferias/MapaLima'
import CodigoQR from '../components/ferias/CodigoQR'
import MicroDocumental from '../components/ferias/MicroDocumental'
import TituloPagina from '../components/ui/TituloPagina'

/** Ferias: mapa de Lima, lista, detalle y pasaporte QR simulado. */
export default function Ferias() {
  const [params, setParams] = useSearchParams()
  const { escaneos } = usePasaporte()
  const detalleRef = useRef<HTMLElement>(null)

  // La feria elegida vive en la dirección (?feria=barranco); por defecto, la más próxima
  const feria = obtenerFeria(params.get('feria') ?? '') ?? FERIAS_POR_FECHA[0]
  const escaneadas = escaneos.map((e) => e.feriaId)

  function elegir(id: string) {
    setParams({ feria: id }, { preventScrollReset: true, replace: true })
    // En pantallas angostas el detalle queda abajo: lo acercamos para que se vea
    if (window.matchMedia('(max-width: 1023px)').matches) {
      requestAnimationFrame(() => detalleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }

  return (
    <>
      <TituloPagina texto={`Ferias · ${feria.distrito}`} />
      <EncabezadoPagina nota="del feed a la feria" titulo="Ferias">
        Encuentra a las marcas en persona. Todas las ferias son de entrada libre y, al escanear tu pasaporte QR, sumas{' '}
        {PUNTOS.escanearFeria} puntos y un sello del distrito.
      </EncabezadoPagina>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
        {/* Columna izquierda: mapa y lista */}
        <div className="space-y-5">
          <MapaLima ferias={FERIAS_POR_FECHA} seleccionada={feria.id} escaneadas={escaneadas} onElegir={elegir} />

          <ul aria-label="Lista de ferias" className="space-y-2">
            {FERIAS_POR_FECHA.map((f) => (
              <li key={f.id}>
                <ItemFeria feria={f} activa={f.id === feria.id} escaneada={escaneadas.includes(f.id)} onElegir={elegir} />
              </li>
            ))}
          </ul>
        </div>

        {/* Columna derecha: detalle */}
        <section ref={detalleRef} aria-labelledby="titulo-feria" className="scroll-mt-36 space-y-5">
          <DetalleFeria feria={feria} />
        </section>
      </div>
    </>
  )
}

/** Fila de la lista de ferias (botón) */
function ItemFeria({
  feria: f,
  activa,
  escaneada,
  onElegir,
}: {
  feria: Feria
  activa: boolean
  escaneada: boolean
  onElegir: (id: string) => void
}) {
  const { dia, mes } = partesFecha(f.fecha)
  return (
    <button
      type="button"
      aria-pressed={activa}
      onClick={() => onElegir(f.id)}
      className={`flex w-full items-center gap-4 rounded-tarjeta border-2 p-3 text-left transition-colors ${
        activa ? 'border-arcilla bg-white' : 'border-transparent bg-white/70 hover:border-algodon-oscuro'
      }`}
    >
      <span className="grid w-14 shrink-0 place-items-center rounded-suave bg-laguna py-1.5 text-white" aria-hidden="true">
        <span className="text-xl font-extrabold leading-none">{dia}</span>
        <span className="text-xs uppercase">{mes}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-bold text-carbon">{f.nombre}</span>
        <span className="block text-sm text-gris-calido">
          {f.distrito} · {formatearFecha(f.fecha)} · entrada libre
        </span>
      </span>
      {escaneada && (
        <span className="shrink-0 rounded-full bg-laguna px-2.5 py-1 text-xs font-bold text-white">Escaneada</span>
      )}
    </button>
  )
}

/** Detalle de la feria elegida + pasaporte QR + documental */
function DetalleFeria({ feria }: { feria: Feria }) {
  const { escaneoDe, escanearFeria } = usePasaporte()
  const escaneo = escaneoDe(feria.id)
  const disenadores = feria.disenadores.map(obtenerDisenador).filter((d) => d !== undefined)

  return (
    <>
      <div className="rounded-bloque border border-algodon-oscuro bg-white p-5 sm:p-6">
        <p className="text-sm font-bold uppercase tracking-wide text-laguna">{feria.distrito}</p>
        <h2 id="titulo-feria" className="font-editorial text-4xl leading-tight text-carbon">
          {feria.nombre}
        </h2>
        <p className="mt-1 text-gris-calido">
          {mayusculaInicial(formatearFecha(feria.fecha, true))} · {feria.horario} ·{' '}
          <span className="rounded-full bg-ocre-suave px-2 py-0.5 text-sm font-bold text-carbon">Entrada libre</span>
        </p>
        <p className="mt-3 leading-relaxed text-gris-calido">{feria.descripcion}</p>

        <h3 className="mt-5 font-bold text-carbon">Diseñadores presentes</h3>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {disenadores.map((d) => (
            <li key={d.id}>
              <Link
                to={`/disenadores/${d.id}`}
                className="flex items-center gap-3 rounded-suave p-2 hover:bg-algodon"
              >
                <Avatar disenador={d} tamano="sm" className="border-2" />
                <span>
                  <span className="block font-bold text-carbon">{d.nombre}</span>
                  <span className="block text-sm text-gris-calido">{d.marca}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tarjeta del pasaporte QR */}
      <div className="grid gap-5 rounded-bloque bg-laguna p-5 text-white sm:grid-cols-[160px_1fr] sm:p-6">
        <div className="mx-auto w-40 rounded-suave bg-white p-2 sm:w-full">
          <CodigoQR texto={`radar-${feria.id}`} etiqueta={`Código QR simulado de ${feria.nombre}`} />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-nota text-2xl text-ocre-suave">tu pasaporte QR</p>
          <p>
            En la feria, escanea el QR del stand para sumar <strong>+{PUNTOS.escanearFeria} pts</strong>, el{' '}
            <strong>sello de {feria.distrito}</strong> y un <strong>micro-documental</strong>.
          </p>
          {escaneo ? (
            <p className="rounded-suave bg-white/15 px-4 py-3 font-bold">
              Ya escaneaste esta feria el {new Date(escaneo.fecha).toLocaleDateString('es-PE')}.
            </p>
          ) : (
            <button
              type="button"
              onClick={() => escanearFeria(feria.id)}
              className="self-start rounded-full bg-ocre px-6 py-3 font-bold text-carbon hover:bg-ocre-suave focus-visible:outline-white"
            >
              Simular escaneo
            </button>
          )}
          <p className="text-xs text-white/85">
            QR de demostración. Los escaneos se tratan según la Ley N.º 29733 de Protección de Datos Personales: solo
            registramos qué feria visitaste, en este navegador.
          </p>
        </div>
      </div>

      {escaneo && <MicroDocumental feria={feria} />}
    </>
  )
}

import { Link } from 'react-router-dom'
import { FERIAS_POR_FECHA } from '../data/ferias'
import { RECOMPENSAS } from '../data/recompensas'
import type { Recompensa } from '../data/tipos'
import { NIVELES, PUNTOS } from '../config'
import { usePasaporte } from '../hooks/usePasaporte'
import { calcularNivel } from '../utils/niveles'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import PatronTextil from '../components/marca/PatronTextil'
import TituloPagina from '../components/ui/TituloPagina'

/** Pasaporte: nivel, sellos, recompensas gratis, cómo sumar puntos y actividad. */
export default function Pasaporte() {
  return (
    <>
      <TituloPagina texto="Pasaporte" />
      <EncabezadoPagina nota="tu recorrido, sellado" titulo="Pasaporte">
        Todo es gratis: tus puntos se ganan participando, nunca comprando.
      </EncabezadoPagina>
      <div className="space-y-12">
        <Nivel />
        <Sellos />
        <Recompensas />
        <ComoSumar />
        <ActividadReciente />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
function Nivel() {
  const { puntos, saldo } = usePasaporte()
  const { actual, siguiente, faltan, porcentaje } = calcularNivel(puntos)

  return (
    <section aria-labelledby="titulo-nivel" className="overflow-hidden rounded-bloque bg-carbon text-algodon">
      <div className="h-3">
        <PatronTextil escala={24} fondo="#1A1714" />
      </div>
      <div className="grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="font-nota text-2xl text-ocre">tu nivel</p>
          <h2 id="titulo-nivel" className="font-editorial text-5xl sm:text-6xl">
            {actual.nombre}
          </h2>
          <div
            role="progressbar"
            aria-label={siguiente ? `Avance hacia ${siguiente.nombre}` : 'Nivel máximo alcanzado'}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={porcentaje}
            className="mt-4 h-3 max-w-xl overflow-hidden rounded-full bg-algodon/20"
          >
            <div className="h-full rounded-full bg-ocre transition-all duration-700" style={{ width: `${porcentaje}%` }} />
          </div>
          <p className="mt-2 text-algodon/85">
            {siguiente
              ? `Te faltan ${faltan} pts para ${siguiente.nombre}.`
              : '¡Llegaste al nivel máximo! Gracias por cuidar la moda local.'}
          </p>
          {/* Escala de niveles */}
          <ol className="mt-4 flex flex-wrap gap-2 text-sm">
            {NIVELES.map((n, i) => {
              const hasta = NIVELES[i + 1] ? `–${NIVELES[i + 1].desde - 1}` : ' o más'
              const alcanzado = puntos >= n.desde
              return (
                <li
                  key={n.nombre}
                  className={`rounded-full px-3 py-1 ${
                    alcanzado ? 'bg-algodon font-bold text-carbon' : 'border border-dashed border-algodon/60'
                  }`}
                >
                  {n.nombre} · {n.desde}
                  {hasta}
                </li>
              )
            })}
          </ol>
        </div>
        <dl className="grid grid-cols-2 gap-3 self-start md:grid-cols-1">
          <div className="rounded-tarjeta bg-algodon/10 p-4">
            <dt className="text-sm text-algodon/85">Puntos acumulados</dt>
            <dd className="text-4xl font-extrabold">{puntos}</dd>
          </div>
          <div className="rounded-tarjeta bg-ocre p-4 text-carbon">
            <dt className="text-sm font-semibold">Saldo para canjear</dt>
            <dd className="text-4xl font-extrabold">{saldo}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function Sellos() {
  const { escaneoDe } = usePasaporte()
  const obtenidos = FERIAS_POR_FECHA.filter((f) => escaneoDe(f.id)).length

  return (
    <section aria-labelledby="titulo-sellos">
      <h2 id="titulo-sellos" className="font-editorial text-4xl text-carbon">
        Sellos de distritos
      </h2>
      <p className="mb-5 text-gris-calido">
        {obtenidos} de {FERIAS_POR_FECHA.length} sellos. Cada feria escaneada te da el sello de su distrito.
      </p>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {FERIAS_POR_FECHA.map((f) => {
          const escaneo = escaneoDe(f.id)
          return (
            <li
              key={f.id}
              className={`flex flex-col items-center gap-2 rounded-tarjeta p-4 text-center ${
                escaneo
                  ? 'border-2 border-solid border-arcilla bg-white'
                  : 'border-2 border-dashed border-gris-calido/60 bg-white/50'
              }`}
            >
              <Sello obtenido={Boolean(escaneo)} />
              <p className="font-bold text-carbon">{f.distrito}</p>
              {escaneo ? (
                <p className="text-sm text-gris-calido">
                  Obtenido el {new Date(escaneo.fecha).toLocaleDateString('es-PE')}
                </p>
              ) : (
                <Link
                  to={`/ferias?feria=${f.id}`}
                  className="inline-flex min-h-11 items-center text-sm font-bold text-laguna underline underline-offset-4"
                >
                  Pendiente · ir a la feria<span className="solo-lector"> de {f.distrito}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/** Dibujo del sello: sólido si se obtuvo, punteado si falta */
function Sello({ obtenido }: { obtenido: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-16 w-16" aria-hidden="true">
      <circle
        cx="32"
        cy="32"
        r="29"
        fill={obtenido ? '#F1DCAE' : 'none'}
        stroke={obtenido ? '#A6372B' : '#4A433D'}
        strokeWidth="2.5"
        strokeDasharray={obtenido ? undefined : '5 4'}
      />
      <path
        d="M27 15h10v5h5v5h5v14h-5v5h-5v5H27v-5h-5v-5h-5V25h5v-5h5z"
        fill={obtenido ? '#A6372B' : 'none'}
        stroke={obtenido ? 'none' : '#4A433D'}
        strokeDasharray={obtenido ? undefined : '3 3'}
        strokeOpacity="0.6"
      />
      {obtenido && <rect x="28" y="28" width="8" height="8" fill="#D39A2F" />}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
function Recompensas() {
  return (
    <section aria-labelledby="titulo-recompensas">
      <p className="font-nota text-2xl text-arcilla">gratis por participar</p>
      <h2 id="titulo-recompensas" className="font-editorial text-4xl text-carbon">
        Recompensas
      </h2>
      <p className="mb-5 text-gris-calido">
        Se canjean solo con puntos. Canjear usa tu saldo, pero tus puntos acumulados (y tu nivel) no bajan.
      </p>
      <ul className="grid gap-4 md:grid-cols-3">
        {RECOMPENSAS.map((r) => (
          <li key={r.id}>
            <TarjetaRecompensa recompensa={r} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function TarjetaRecompensa({ recompensa: r }: { recompensa: Recompensa }) {
  const { saldo, canjeDe, canjear } = usePasaporte()
  const canje = canjeDe(r.id)
  const faltan = r.puntos - saldo

  return (
    <article className="flex h-full flex-col gap-3 rounded-tarjeta border border-algodon-oscuro bg-white p-5">
      <span className="self-start rounded-full bg-ocre px-3 py-1 text-sm font-extrabold text-carbon">{r.puntos} pts</span>
      <h3 className="font-editorial text-2xl leading-tight text-carbon">{r.nombre}</h3>
      <p className="text-sm leading-relaxed text-gris-calido">{r.descripcion}</p>
      <div className="mt-auto pt-2">
        {canje ? (
          <p className="rounded-suave bg-laguna px-4 py-3 text-sm text-white">
            <strong>Canjeado.</strong> Tu código: <span className="font-mono font-bold">{canje.codigo}</span>
          </p>
        ) : faltan <= 0 ? (
          <button
            type="button"
            onClick={() => canjear(r.id)}
            className="w-full rounded-full bg-arcilla px-5 py-3 font-bold text-white hover:bg-arcilla-oscura"
          >
            Canjear<span className="solo-lector"> {r.nombre}</span>
          </button>
        ) : (
          <div>
            <p className="font-bold text-carbon">Te faltan {faltan} pts</p>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-algodon-oscuro" aria-hidden="true">
              <div className="h-full bg-ocre" style={{ width: `${Math.max(0, (saldo / r.puntos) * 100)}%` }} />
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
function ComoSumar() {
  const formas = [
    { accion: 'Escanear el QR en una feria', puntos: PUNTOS.escanearFeria, detalle: 'una vez por feria', ruta: '/ferias' },
    { accion: 'Nominar una marca local', puntos: PUNTOS.nominarMarca, detalle: 'en Comunidad', ruta: '/comunidad' },
    { accion: 'Votar la próxima atmósfera', puntos: PUNTOS.votarAtmosfera, detalle: 'un voto por persona', ruta: '/comunidad' },
    { accion: 'Seguir a un diseñador', puntos: PUNTOS.seguirDisenador, detalle: 'la primera vez', ruta: '/disenadores' },
  ]

  return (
    <section aria-labelledby="titulo-sumar" className="rounded-bloque border border-algodon-oscuro bg-white p-5 sm:p-8">
      <h2 id="titulo-sumar" className="font-editorial text-4xl text-carbon">
        ¿Cómo sumo puntos?
      </h2>
      <p className="mt-1 text-gris-calido">
        Participando. <strong className="text-carbon">Nunca necesitas comprar nada</strong> para ganar puntos ni
        recompensas.
      </p>
      <ul className="mt-5 divide-y divide-algodon-oscuro">
        {formas.map((f) => (
          <li key={f.accion} className="flex flex-wrap items-center justify-between gap-2 py-3">
            <span>
              <Link to={f.ruta} className="font-bold text-carbon underline-offset-4 hover:underline">
                {f.accion}
              </Link>
              <span className="block text-sm text-gris-calido">{f.detalle}</span>
            </span>
            <span className="rounded-full bg-ocre-suave px-3 py-1 font-extrabold text-carbon">+{f.puntos} pts</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function ActividadReciente() {
  const { actividad, reiniciar } = usePasaporte()

  function confirmarReinicio() {
    if (window.confirm('¿Borrar todo tu progreso de esta demo? Puntos, sellos y canjes volverán a cero.')) reiniciar()
  }

  return (
    <section aria-labelledby="titulo-actividad">
      <h2 id="titulo-actividad" className="font-editorial text-4xl text-carbon">
        Actividad reciente
      </h2>
      {actividad.length === 0 ? (
        <p className="mt-2 text-gris-calido">
          Aún no hay actividad. Empieza siguiendo a un <Link to="/disenadores" className="font-bold text-arcilla underline underline-offset-4">diseñador</Link>{' '}
          o visitando una <Link to="/ferias" className="font-bold text-arcilla underline underline-offset-4">feria</Link>.
        </p>
      ) : (
        <ol className="mt-4 space-y-2">
          {actividad.slice(0, 10).map((a) => (
            <li key={a.id} className="flex items-start justify-between gap-3 rounded-suave bg-white px-4 py-3">
              <span>
                <span className="block text-carbon">{a.texto}</span>
                <span className="text-xs text-gris-calido">{new Date(a.fecha).toLocaleString('es-PE')}</span>
              </span>
              {a.puntos ? <span className="shrink-0 font-extrabold text-laguna">+{a.puntos}</span> : null}
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        onClick={confirmarReinicio}
        className="mt-6 min-h-11 rounded-full border-2 border-gris-calido px-5 py-2 text-sm font-bold text-gris-calido hover:border-carbon hover:text-carbon"
      >
        Reiniciar demo
      </button>
    </section>
  )
}

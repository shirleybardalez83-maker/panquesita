import { useState, type FormEvent } from 'react'
import { CANDIDATAS, NOMINACIONES_COMUNIDAD, type EstadoNominacion } from '../data/comunidad'
import { MAX_NOMINACIONES_CON_PUNTOS, PUNTOS } from '../config'
import { usePasaporte } from '../hooks/usePasaporte'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import BarraDato from '../components/ui/BarraDato'
import Campo from '../components/ui/Campo'
import TituloPagina from '../components/ui/TituloPagina'

/** Comunidad: co-creación de la curaduría (votar y nominar). */
export default function Comunidad() {
  return (
    <>
      <TituloPagina texto="Comunidad" />
      <EncabezadoPagina nota="co-creamos la curaduría" titulo="Comunidad">
        Tú decides qué atmósfera llega después y qué marcas merecen estar en RADAR.
      </EncabezadoPagina>
      <div className="grid gap-10 lg:grid-cols-2">
        <Votacion />
        <Nominar />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Votar la próxima atmósfera                                          */
/* ------------------------------------------------------------------ */
function Votacion() {
  const { votoAtmosfera, votar } = usePasaporte()
  const [eleccion, setEleccion] = useState('')
  const [error, setError] = useState('')

  // Sumamos tu voto a los votos simulados de la comunidad
  const votos = CANDIDATAS.map((c) => ({ ...c, votos: c.votosBase + (votoAtmosfera === c.id ? 1 : 0) }))
  const total = votos.reduce((t, c) => t + c.votos, 0)

  function enviar(e: FormEvent) {
    e.preventDefault()
    const candidata = CANDIDATAS.find((c) => c.id === eleccion)
    if (!candidata) {
      setError('Elige una atmósfera antes de votar.')
      return
    }
    votar(candidata.id, candidata.nombre)
  }

  return (
    <section aria-labelledby="titulo-votacion" className="rounded-bloque border border-algodon-oscuro bg-white p-5 sm:p-8">
      <h2 id="titulo-votacion" className="font-editorial text-4xl text-carbon">
        Vota la próxima atmósfera
      </h2>
      <p className="mt-1 text-gris-calido">
        Un voto por persona · <strong className="text-carbon">+{PUNTOS.votarAtmosfera} pts</strong>
      </p>

      {votoAtmosfera ? (
        // Resultados en vivo (después de votar)
        <div className="mt-6 space-y-4" aria-live="polite">
          {[...votos]
            .sort((a, b) => b.votos - a.votos)
            .map((c) => {
              const pct = Math.round((c.votos / total) * 100)
              return (
                <BarraDato
                  key={c.id}
                  etiqueta={c.nombre}
                  valorTexto={`${pct} %`}
                  porcentaje={pct}
                  destacada={c.id === votoAtmosfera}
                  detalle={c.id === votoAtmosfera ? 'Tu voto' : undefined}
                />
              )
            })}
          <p className="pt-2 text-sm text-gris-calido">
            {total.toLocaleString('es-PE')} votos en total. Gracias por votar: la atmósfera ganadora llega el próximo mes.
          </p>
        </div>
      ) : (
        <form onSubmit={enviar} noValidate className="mt-6">
          <fieldset aria-describedby={error ? 'error-voto' : undefined}>
            <legend className="solo-lector">Candidatas a la próxima atmósfera</legend>
            <div className="space-y-3">
              {CANDIDATAS.map((c) => (
                <label
                  key={c.id}
                  className={`flex cursor-pointer gap-3 rounded-tarjeta border-2 p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-laguna ${
                    eleccion === c.id ? 'border-arcilla bg-algodon' : 'border-algodon-oscuro hover:border-gris-calido'
                  }`}
                >
                  <input
                    type="radio"
                    name="atmosfera"
                    value={c.id}
                    checked={eleccion === c.id}
                    onChange={() => {
                      setEleccion(c.id)
                      setError('')
                    }}
                    className="mt-1 h-5 w-5 shrink-0 accent-arcilla focus-visible:outline-none"
                  />
                  <span>
                    <span className="block font-bold text-carbon">{c.nombre}</span>
                    <span className="block text-sm text-gris-calido">{c.descripcion}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          {error && (
            <p id="error-voto" className="mt-3 text-sm font-semibold text-arcilla">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="mt-5 rounded-full bg-arcilla px-6 py-3 font-bold text-white hover:bg-arcilla-oscura"
          >
            Votar
          </button>
        </form>
      )}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Nominar una marca                                                   */
/* ------------------------------------------------------------------ */
function Nominar() {
  const { nominaciones, nominar } = usePasaporte()
  const [marca, setMarca] = useState('')
  const [enlace, setEnlace] = useState('')
  const [motivo, setMotivo] = useState('')
  const [error, setError] = useState('')

  const conPuntos = nominaciones.filter((n) => n.conPuntos).length
  const quedan = Math.max(0, MAX_NOMINACIONES_CON_PUNTOS - conPuntos)

  function enviar(e: FormEvent) {
    e.preventDefault()
    if (!marca.trim()) {
      setError('Escribe el nombre de la marca.')
      document.getElementById('marca-nominada')?.focus()
      return
    }
    const resultado = nominar({ marca, enlace, motivo })
    if (resultado === 'repetida') {
      setError('Ya nominaste esta marca. Prueba con otra.')
      document.getElementById('marca-nominada')?.focus()
      return
    }
    // Limpiamos el formulario para una nueva nominación
    setMarca('')
    setEnlace('')
    setMotivo('')
    setError('')
  }

  return (
    <section aria-labelledby="titulo-nominar" className="space-y-6">
      <div className="rounded-bloque border border-algodon-oscuro bg-white p-5 sm:p-8">
        <h2 id="titulo-nominar" className="font-editorial text-4xl text-carbon">
          Nomina una marca
        </h2>
        <p className="mt-1 text-gris-calido">
          {quedan > 0 ? (
            <>
              <strong className="text-carbon">+{PUNTOS.nominarMarca} pts</strong> por cada marca distinta. Te quedan{' '}
              {quedan} {quedan === 1 ? 'nominación' : 'nominaciones'} con puntos.
            </>
          ) : (
            'Ya usaste tus nominaciones con puntos, pero puedes seguir nominando marcas.'
          )}
        </p>

        <form onSubmit={enviar} noValidate className="mt-5 space-y-4">
          <Campo id="marca-nominada" etiqueta="Nombre de la marca" error={error || undefined} obligatorio>
            {(attrs) => (
              <input
                {...attrs}
                type="text"
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value)
                  setError('')
                }}
              />
            )}
          </Campo>
          <Campo id="enlace-nominada" etiqueta="Instagram o web" ayuda="Opcional">
            {(attrs) => <input {...attrs} type="text" value={enlace} onChange={(e) => setEnlace(e.target.value)} />}
          </Campo>
          <Campo id="motivo-nominada" etiqueta="¿Por qué la nominas?" ayuda="Opcional">
            {(attrs) => <textarea {...attrs} rows={3} value={motivo} onChange={(e) => setMotivo(e.target.value)} />}
          </Campo>
          <button
            type="submit"
            className="rounded-full bg-arcilla px-6 py-3 font-bold text-white hover:bg-arcilla-oscura"
          >
            Nominar
          </button>
        </form>
      </div>

      <div>
        <h3 className="mb-3 font-editorial text-3xl text-carbon">Nominaciones</h3>
        <ul className="space-y-2">
          {nominaciones.map((n) => (
            <ItemNominacion key={n.id} marca={n.marca} motivo={n.motivo} estado="Recibida" tuya />
          ))}
          {NOMINACIONES_COMUNIDAD.map((n) => (
            <ItemNominacion key={n.id} marca={n.marca} motivo={n.motivo} estado={n.estado} />
          ))}
        </ul>
      </div>
    </section>
  )
}

/** Estilo de cada estado (siempre con texto, nunca solo color) */
const ESTILO_ESTADO: Record<EstadoNominacion, string> = {
  Recibida: 'border border-gris-calido text-gris-calido',
  'En curaduría': 'bg-ocre-suave text-carbon',
  Aceptada: 'bg-laguna text-white',
}

function ItemNominacion({
  marca,
  motivo,
  estado,
  tuya = false,
}: {
  marca: string
  motivo: string
  estado: EstadoNominacion
  tuya?: boolean
}) {
  return (
    <li className="flex items-start justify-between gap-3 rounded-tarjeta bg-white p-4">
      <span className="min-w-0">
        <span className="block font-bold text-carbon">
          {marca}
          {tuya && <span className="ml-2 text-xs font-semibold text-arcilla">(tu nominación)</span>}
        </span>
        {motivo && <span className="block text-sm text-gris-calido">{motivo}</span>}
      </span>
      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${ESTILO_ESTADO[estado]}`}>{estado}</span>
    </li>
  )
}

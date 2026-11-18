import { useState, type FormEvent } from 'react'
import { DISENADORES, obtenerDisenador } from '../data/disenadores'
import { feriasDeDisenador } from '../data/ferias'
import { prendasDeDisenador } from '../data/prendas'
import type { Disenador } from '../data/tipos'
import { MEJORA_PERFIL } from '../config'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import BarraDato from '../components/ui/BarraDato'
import Campo from '../components/ui/Campo'
import Modal from '../components/ui/Modal'
import Sostenibilidad from '../components/ui/Sostenibilidad'
import { InsigniaDestacado } from '../components/ui/Etiquetas'
import TituloPagina from '../components/ui/TituloPagina'

/**
 * Panel para marcas y diseñadores.
 * ⚠ Es la ÚNICA pantalla de RADAR que muestra un precio (la mejora de perfil opcional).
 * Los números son simulados para la demo.
 */

/** Número "aleatorio" pero estable a partir de un texto (mismo texto → mismo número) */
function numeroEstable(texto: string, min: number, max: number): number {
  let h = 0
  for (const c of texto) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return min + (h % (max - min + 1))
}

export default function Marcas() {
  const [marcaId, setMarcaId] = useState(DISENADORES[0].id)
  const d = obtenerDisenador(marcaId) ?? DISENADORES[0]

  return (
    <>
      <TituloPagina texto="Panel de marca" />
      <EncabezadoPagina nota="para marcas y diseñadores" titulo="Panel de marca">
        Tu perfil, tu narrativa, tu QR y tu reporte mensual son gratis. Tus ventas no pagan comisión.
      </EncabezadoPagina>

      {/* Selector de marca de ejemplo */}
      <div className="mb-8 flex flex-wrap items-center gap-3 rounded-tarjeta bg-white p-4">
        <label htmlFor="ver-como" className="font-bold text-carbon">
          Ver panel como:
        </label>
        <select
          id="ver-como"
          value={marcaId}
          onChange={(e) => setMarcaId(e.target.value)}
          className="min-h-11 rounded-suave border border-gris-calido/70 bg-white px-3 py-2 text-carbon"
        >
          {DISENADORES.map((x) => (
            <option key={x.id} value={x.id}>
              {x.marca} ({x.nombre})
            </option>
          ))}
        </select>
        <span className="text-sm text-gris-calido">Datos de demostración</span>
      </div>

      <div className="space-y-12">
        <Indicadores d={d} />
        <Vitrina d={d} />
        <Planes />
        <Sostenibilidad />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
function Indicadores({ d }: { d: Disenador }) {
  const datos = [
    { etiqueta: 'Escaneos QR', valor: numeroEstable(d.id + 'qr', 40, 160), nota: 'este mes en ferias' },
    { etiqueta: 'Visitas al perfil', valor: numeroEstable(d.id + 'vis', 600, 2400), nota: 'últimos 30 días' },
    {
      etiqueta: 'Ventas generadas',
      valor: numeroEstable(d.id + 'ven', 8, 45),
      nota: 'sin comisión: 0 % para RADAR',
    },
    { etiqueta: 'Reproducciones de la narrativa', valor: numeroEstable(d.id + 'rep', 300, 1500), nota: 'audios de 45 s' },
  ]

  return (
    <section aria-labelledby="titulo-indicadores">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 id="titulo-indicadores" className="font-editorial text-4xl text-carbon">
          {d.marca}
        </h2>
        {d.destacado && <InsigniaDestacado />}
      </div>
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {datos.map((x) => (
          <div key={x.etiqueta} className="rounded-tarjeta border border-algodon-oscuro bg-white p-5">
            <dt className="text-sm font-semibold text-gris-calido">{x.etiqueta}</dt>
            <dd className="mt-1 text-4xl font-extrabold tabular-nums text-carbon">{x.valor.toLocaleString('es-PE')}</dd>
            <dd className="mt-1 text-xs text-gris-calido">{x.nota}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function Vitrina({ d }: { d: Disenador }) {
  const prendas = prendasDeDisenador(d.id)
  const ferias = feriasDeDisenador(d.id)

  return (
    <section aria-labelledby="titulo-vitrina">
      <h2 id="titulo-vitrina" className="font-editorial text-4xl text-carbon">
        Prendas en vitrina
      </h2>
      <p className="mb-5 text-gris-calido">Escaneos del QR de cada prenda en las ferias donde participas.</p>
      <ul className="grid gap-4 md:grid-cols-2">
        {prendas.map((p, i) => {
          const escaneos = ferias.map((f) => ({ feria: f, valor: numeroEstable(p.id + f.id, 4, 38) }))
          const maximo = Math.max(...escaneos.map((e) => e.valor), 1)
          const total = escaneos.reduce((t, e) => t + e.valor, 0)
          const enRevision = i === 1 // ejemplo: la segunda prenda tiene cambios por revisar
          return (
            <li key={p.id} className="rounded-tarjeta border border-algodon-oscuro bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-editorial text-2xl leading-tight text-carbon">{p.nombre}</h3>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    enRevision ? 'bg-ocre-suave text-carbon' : 'bg-laguna text-white'
                  }`}
                >
                  {enRevision ? 'En revisión' : 'Publicada'}
                </span>
              </div>
              <p className="mt-1 text-sm text-gris-calido">{total} escaneos en total</p>
              {/* Mini gráfico: una barra por feria, con el número escrito */}
              <div className="mt-4 space-y-3">
                {escaneos.map((e) => (
                  <BarraDato
                    key={e.feria.id}
                    etiqueta={e.feria.distrito}
                    valorTexto={String(e.valor)}
                    porcentaje={(e.valor / maximo) * 100}
                  />
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function Planes() {
  const [interes, setInteres] = useState(false)

  const gratis = [
    'Perfil con portada, biografía y colección',
    'Narrativa en audio de cada prenda',
    'QR para ferias y trazabilidad',
    'Reporte mensual de escaneos y visitas',
    '0 % de comisión por ventas',
  ]

  return (
    <section aria-labelledby="titulo-planes">
      <h2 id="titulo-planes" className="font-editorial text-4xl text-carbon">
        Tu perfil en RADAR
      </h2>
      <p className="mb-5 text-gris-calido">Lo básico es gratis siempre. La mejora es opcional y puedes dejarla cuando quieras.</p>

      <div className="grid gap-5 md:grid-cols-2">
        <article className="flex flex-col rounded-bloque border-2 border-carbon bg-white p-6">
          <h3 className="text-xl font-extrabold text-carbon">Perfil RADAR</h3>
          <p className="mt-1 font-editorial text-4xl text-carbon">Gratis siempre</p>
          <ul className="mt-5 space-y-2">
            {gratis.map((b) => (
              <Beneficio key={b}>{b}</Beneficio>
            ))}
          </ul>
        </article>

        <article className="flex flex-col rounded-bloque border-2 border-laguna bg-white p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-extrabold text-carbon">Mejora de perfil</h3>
            <span className="rounded-full bg-ocre-suave px-3 py-1 text-xs font-bold text-carbon">Opcional</span>
          </div>
          <p className="mt-1 font-editorial text-4xl text-carbon">
            {MEJORA_PERFIL.moneda} {MEJORA_PERFIL.precioMensual}
            <span className="font-ui text-base text-gris-calido"> al mes</span>
          </p>
          <p className="mt-1 text-sm text-gris-calido">Todo lo del perfil gratis, más:</p>
          <ul className="mt-4 space-y-2">
            {MEJORA_PERFIL.beneficios.map((b) => (
              <Beneficio key={b}>{b}</Beneficio>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => setInteres(true)}
            className="mt-6 self-start rounded-full bg-laguna px-6 py-3 font-bold text-white hover:bg-carbon"
          >
            Me interesa
          </button>
          <p className="mt-2 text-xs text-gris-calido">Sin pagos en línea: te contactamos para conversar.</p>
        </article>
      </div>

      {interes && (
        <Modal tituloId="titulo-interes" onCerrar={() => setInteres(false)} ancho="max-w-xl">
          <FormularioInteres />
        </Modal>
      )}
    </section>
  )
}

function Beneficio({ children }: { children: string }) {
  return (
    <li className="flex gap-2 text-carbon">
      <svg width="18" height="18" viewBox="0 0 18 18" className="mt-0.5 shrink-0" aria-hidden="true">
        <circle cx="9" cy="9" r="9" fill="#1F5662" />
        <path d="M5 9.5l2.5 2.5L13 6.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {children}
    </li>
  )
}

/** Formulario de interés en la mejora (no cobra nada, no hay pasarela) */
function FormularioInteres() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [errores, setErrores] = useState<{ nombre?: string; correo?: string }>({})
  const [enviado, setEnviado] = useState(false)

  function enviar(e: FormEvent) {
    e.preventDefault()
    const nuevos: typeof errores = {}
    if (!nombre.trim()) nuevos.nombre = 'Escribe tu nombre o el de tu marca.'
    if (!/^\S+@\S+\.\S+$/.test(correo)) nuevos.correo = 'Escribe un correo válido, por ejemplo hola@tumarca.pe.'
    setErrores(nuevos)
    if (nuevos.nombre) document.getElementById('interes-nombre')?.focus()
    else if (nuevos.correo) document.getElementById('interes-correo')?.focus()
    else setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="p-6 sm:p-8" role="status">
        <h2 id="titulo-interes" className="font-editorial text-4xl text-carbon">
          ¡Gracias!
        </h2>
        <p className="mt-2 text-gris-calido">
          Te escribiremos para contarte más. No se ha hecho ningún cobro. Versión de demostración: no se envió a ningún
          servidor.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-4 p-6 sm:p-8">
      <h2 id="titulo-interes" className="pr-10 font-editorial text-4xl text-carbon">
        Me interesa la mejora
      </h2>
      <p className="text-sm text-gris-calido">Déjanos tus datos y te contactamos. No pedimos datos de pago.</p>
      <Campo id="interes-nombre" etiqueta="Nombre o marca" error={errores.nombre} obligatorio>
        {(attrs) => <input {...attrs} type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />}
      </Campo>
      <Campo id="interes-correo" etiqueta="Correo" error={errores.correo} obligatorio>
        {(attrs) => (
          <input {...attrs} type="email" autoComplete="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        )}
      </Campo>
      <button type="submit" className="rounded-full bg-laguna px-6 py-3 font-bold text-white hover:bg-carbon">
        Enviar
      </button>
    </form>
  )
}

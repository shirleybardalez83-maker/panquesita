import { Link } from 'react-router-dom'
import { PASOS } from '../navegacion'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import Sostenibilidad from '../components/ui/Sostenibilidad'
import TituloPagina from '../components/ui/TituloPagina'

/** Cómo funciona: diagrama de dos carriles, qué es gratis, sostenibilidad y preguntas. */

const PASOS_MARCAS = [
  { titulo: 'Postula gratis', detalle: 'Cuéntanos tu historia en un formulario.', ruta: '/disenadores' },
  { titulo: 'Curaduría', detalle: 'El equipo revisa tu propuesta por atmósferas.' },
  { titulo: 'Perfil, narrativa y QR', detalle: 'Publicamos tu perfil, tus audios y tu QR para ferias.' },
  { titulo: 'Reporte mensual', detalle: 'Escaneos, visitas y ventas, sin comisión.', ruta: '/marcas' },
  { titulo: 'Mejora de perfil opcional', detalle: 'Solo si quieres más visibilidad.', ruta: '/marcas' },
]

const PREGUNTAS = [
  {
    pregunta: '¿Tengo que pagar algo para usar RADAR?',
    respuesta:
      'No. El registro, el feed, las narrativas, el pasaporte, los puntos, los sellos y las recompensas son gratis. Los puntos se ganan participando, nunca comprando.',
  },
  {
    pregunta: '¿Qué hacen con mis datos cuando escaneo un QR?',
    respuesta:
      'Los escaneos se tratan según la Ley N.º 29733 de Protección de Datos Personales: solo registramos qué feria visitaste para darte tu sello y tus puntos. En esta versión de demostración, todo se guarda únicamente en tu navegador.',
  },
  {
    pregunta: '¿Cómo eligen a las marcas?',
    respuesta:
      'Por curaduría humana, no por algoritmo: revisamos la historia de la marca, su taller, sus insumos y a qué atmósfera cultural pertenece. La comunidad también puede nominar marcas.',
  },
  {
    pregunta: '¿RADAR cobra comisión por las ventas?',
    respuesta:
      'No. Las marcas venden directamente y no pagan comisión. Su perfil, narrativa, QR y reporte también son gratis.',
  },
]

export default function ComoFunciona() {
  return (
    <>
      <TituloPagina texto="Cómo funciona" />
      <EncabezadoPagina nota="sin letra pequeña" titulo="Cómo funciona RADAR">
        Dos recorridos que se alimentan: el de las personas que descubren moda y el de las marcas que la crean.
      </EncabezadoPagina>

      <div className="space-y-12">
        <Diagrama />
        <GratisParaTodos />
        <Sostenibilidad />
        <Preguntas />
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
function Diagrama() {
  return (
    <section aria-labelledby="titulo-diagrama" className="rounded-bloque border border-algodon-oscuro bg-white p-5 sm:p-8">
      <h2 id="titulo-diagrama" className="solo-lector">
        Diagrama de dos carriles
      </h2>

      <Carril
        titulo="Personas usuarias"
        color="arcilla"
        pasos={PASOS.map((p) => ({ titulo: p.titulo, detalle: p.detalle, ruta: p.ruta }))}
      />

      {/* Flecha entre carriles: las marcas alimentan la app */}
      <div className="my-6 flex items-center justify-center gap-3" role="note">
        <svg width="28" height="44" viewBox="0 0 28 44" aria-hidden="true" className="shrink-0">
          <path d="M14 42V6" stroke="#1F5662" strokeWidth="2.5" strokeDasharray="5 4" />
          <path d="M5 13l9-10 9 10" fill="none" stroke="#1F5662" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
        <p className="font-nota text-2xl text-laguna">el contenido de las marcas alimenta la app</p>
      </div>

      <Carril titulo="Marcas y diseñadores" color="laguna" pasos={PASOS_MARCAS} />
    </section>
  )
}

function Carril({
  titulo,
  color,
  pasos,
}: {
  titulo: string
  color: 'arcilla' | 'laguna'
  pasos: { titulo: string; detalle: string; ruta?: string }[]
}) {
  const fondo = color === 'arcilla' ? 'bg-arcilla' : 'bg-laguna'
  const borde = color === 'arcilla' ? 'border-arcilla' : 'border-laguna'

  return (
    <div>
      <h3 className={`mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-bold text-white ${fondo}`}>{titulo}</h3>
      {/* En celular: lista vertical; desde escritorio: fila de 5 pasos con flechas */}
      <ol className="grid gap-3 lg:grid-cols-5 lg:gap-6">
        {pasos.map((p, i) => {
          const contenido = (
            <>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold text-white ${fondo}`}>
                {i + 1}
              </span>
              <span>
                <span className="block font-bold text-carbon">{p.titulo}</span>
                <span className="block text-sm text-gris-calido">{p.detalle}</span>
              </span>
            </>
          )
          return (
            <li key={p.titulo} className="relative">
              {p.ruta ? (
                <Link
                  to={p.ruta}
                  className={`flex h-full gap-3 rounded-tarjeta border-2 ${borde} bg-algodon p-4 transition-colors hover:bg-white lg:flex-col`}
                >
                  {contenido}
                </Link>
              ) : (
                <div className={`flex h-full gap-3 rounded-tarjeta border-2 border-dashed ${borde} bg-algodon p-4 lg:flex-col`}>
                  {contenido}
                </div>
              )}
              {/* Flecha hacia el siguiente paso (solo escritorio) */}
              {i < pasos.length - 1 && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="absolute -right-[22px] top-1/2 hidden -translate-y-1/2 lg:block"
                >
                  <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="#4A433D" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ------------------------------------------------------------------ */
function GratisParaTodos() {
  const columnas = [
    {
      titulo: 'Para personas usuarias',
      items: ['Registro', 'Feed curado y narrativas', 'Pasaporte, puntos y sellos', 'Recompensas (se canjean solo con puntos)'],
    },
    {
      titulo: 'Para marcas y diseñadores',
      items: ['Perfil y narrativa', 'QR para ferias', 'Reporte mensual', 'Ventas sin comisión'],
    },
  ]

  return (
    <section aria-labelledby="titulo-gratis">
      <p className="font-nota text-2xl text-arcilla">accesible para todos</p>
      <h2 id="titulo-gratis" className="font-editorial text-4xl text-carbon">
        Gratis para todos
      </h2>
      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {columnas.map((c) => (
          <div key={c.titulo} className="rounded-tarjeta border border-algodon-oscuro bg-white p-5">
            <h3 className="font-bold text-carbon">{c.titulo}</h3>
            <ul className="mt-3 space-y-2">
              {c.items.map((x) => (
                <li key={x} className="flex gap-2 text-gris-calido">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-ocre" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-gris-calido">
        Lo único opcional es la mejora de perfil para marcas.{' '}
        <Link to="/marcas" className="font-bold text-arcilla underline underline-offset-4">
          Ver detalles para marcas
        </Link>
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
function Preguntas() {
  return (
    <section aria-labelledby="titulo-preguntas">
      <h2 id="titulo-preguntas" className="mb-4 font-editorial text-4xl text-carbon">
        Preguntas frecuentes
      </h2>
      {/* <details> es un acordeón nativo del navegador: accesible con teclado sin código extra */}
      <div className="space-y-3">
        {PREGUNTAS.map((p) => (
          <details key={p.pregunta} className="group rounded-tarjeta border border-algodon-oscuro bg-white">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-tarjeta p-4 font-bold text-carbon [&::-webkit-details-marker]:hidden">
              {p.pregunta}
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="shrink-0 transition-transform group-open:rotate-45">
                <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </summary>
            <p className="px-4 pb-4 leading-relaxed text-gris-calido">{p.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

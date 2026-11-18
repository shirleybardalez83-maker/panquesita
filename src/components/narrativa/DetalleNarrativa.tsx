import { Link } from 'react-router-dom'
import { obtenerDisenador } from '../../data/disenadores'
import { feriasDeDisenador } from '../../data/ferias'
import type { Prenda } from '../../data/tipos'
import { formatearFecha } from '../../utils/fechas'
import Imagen from '../ui/Imagen'
import { EtiquetaAtmosfera } from '../ui/Etiquetas'
import ReproductorAudio from './ReproductorAudio'
import MapaOrigen from './MapaOrigen'
import BarraTrazabilidad from './BarraTrazabilidad'
import { usePasaporte } from '../../hooks/usePasaporte'

/**
 * Contenido completo de la narrativa de una prenda.
 * Se usa igual dentro del modal y como página independiente.
 */
type Props = {
  prenda: Prenda
  /** id del título (lo usa el modal para anunciarlo) */
  tituloId: string
  /** En el modal el título es h2; como página, h1 */
  esModal: boolean
}

export default function DetalleNarrativa({ prenda, tituloId, esModal }: Props) {
  const disenador = obtenerDisenador(prenda.disenador)
  const proximaFeria = disenador ? feriasDeDisenador(disenador.id)[0] : undefined
  // Niveles de título: en el modal h2 → h3; como página h1 → h2 (sin saltos)
  const Titulo = esModal ? 'h2' : 'h1'
  const Subtitulo = esModal ? 'h3' : 'h2'

  // La trazabilidad llega al 100 % si escaneaste en una feria donde está este diseñador
  const { escaneasteADisenador } = usePasaporte()
  const escaneada = disenador ? escaneasteADisenador(disenador.id) : false

  return (
    <div className="grid md:grid-cols-[5fr_7fr]">
      {/* Columna de la foto: queda fija al desplazarse en pantallas grandes */}
      <div className="md:sticky md:top-0 md:self-start">
        <Imagen
          src={prenda.imagen}
          alt={`${prenda.nombre}, prenda de ${disenador?.marca ?? 'marca independiente'}`}
          nombre={prenda.nombre}
          className="aspect-[4/3] w-full rounded-t-bloque md:aspect-[4/5] md:rounded-l-bloque md:rounded-tr-none"
        />
      </div>

      <div className="space-y-6 p-5 sm:p-8">
        <header className="space-y-2 pr-10">
          <EtiquetaAtmosfera id={prenda.atmosfera} />
          <Titulo id={tituloId} className="font-editorial text-4xl leading-tight text-carbon sm:text-5xl">
            {prenda.nombre}
          </Titulo>
          {disenador && (
            <p className="text-gris-calido">
              por{' '}
              <Link
                to={`/disenadores/${disenador.id}`}
                className="font-bold text-arcilla underline underline-offset-4 hover:text-arcilla-oscura"
              >
                {disenador.nombre}
              </Link>{' '}
              · {disenador.marca}
            </p>
          )}
        </header>

        {/* Audio + cita (la cita sirve de transcripción) */}
        <section aria-label="Narrativa en audio" className="space-y-3">
          <ReproductorAudio titulo="Mi inspiración" />
          <blockquote className="border-l-4 border-arcilla pl-4">
            <p className="font-editorial text-2xl leading-snug text-carbon">“{prenda.cita}”</p>
            {disenador && <footer className="mt-1 text-sm text-gris-calido">— {disenador.nombre}</footer>}
          </blockquote>
        </section>

        <section aria-labelledby={`${tituloId}-historia`}>
          <Subtitulo id={`${tituloId}-historia`} className="mb-2 font-bold text-carbon">
            Historia de la prenda
          </Subtitulo>
          <p className="leading-relaxed text-gris-calido">{prenda.historia}</p>
        </section>

        <section aria-labelledby={`${tituloId}-origen`}>
          <Subtitulo id={`${tituloId}-origen`} className="mb-1 font-bold text-carbon">
            Origen de insumos
          </Subtitulo>
          <p className="mb-3 text-sm text-gris-calido">{prenda.insumo}</p>
          <MapaOrigen insumo={prenda.origen1} taller={prenda.origen2} />
        </section>

        <BarraTrazabilidad
          nivelTitulo={Subtitulo}
          escaneada={escaneada}
          etapas={[
            { nombre: 'Insumo', detalle: prenda.origen1.region },
            { nombre: 'Taller', detalle: prenda.origen2.lugar },
            { nombre: 'Diseño', detalle: disenador?.marca ?? '—' },
            { nombre: 'Feria', detalle: escaneada ? 'Escaneado' : 'Por escanear' },
          ]}
        />

        {/* Acciones */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {disenador && (
            <Link
              to={`/disenadores/${disenador.id}`}
              className="rounded-full bg-arcilla px-6 py-3 text-center font-bold text-white hover:bg-arcilla-oscura"
            >
              Conocer al diseñador
            </Link>
          )}
          <Link
            to={proximaFeria ? `/ferias?feria=${proximaFeria.id}` : '/ferias'}
            className="rounded-full border-2 border-laguna px-6 py-3 text-center font-bold text-laguna hover:bg-laguna hover:text-white"
          >
            Ver en qué feria está
          </Link>
        </div>
        {proximaFeria && (
          <p className="text-sm text-gris-calido">
            Próxima feria: <strong className="text-carbon">{proximaFeria.nombre}</strong>, {proximaFeria.distrito} ·{' '}
            {formatearFecha(proximaFeria.fecha)} · entrada libre
          </p>
        )}
      </div>
    </div>
  )
}

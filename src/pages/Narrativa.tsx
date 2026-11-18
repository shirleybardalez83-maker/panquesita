import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { obtenerPrenda } from '../data/prendas'
import DetalleNarrativa from '../components/narrativa/DetalleNarrativa'
import Modal from '../components/ui/Modal'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import TituloPagina from '../components/ui/TituloPagina'

/**
 * Narrativa de una prenda (/prenda/:id).
 * - Si llegaste desde el feed (hay `state.fondo`), se muestra como modal.
 * - Si entraste directo con el enlace, se muestra como página normal.
 */
export default function Narrativa() {
  // useParams lee la parte variable de la dirección: /prenda/p1 → id = "p1"
  const { id = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const esModal = Boolean((location.state as { fondo?: unknown } | null)?.fondo)
  const prenda = obtenerPrenda(id)
  const tituloId = `prenda-${id}-titulo`

  // Cerrar el modal = volver a la página anterior del historial
  const cerrar = () => navigate(-1)

  if (!prenda) {
    const contenido = (
      <div className="p-8">
        <EncabezadoPagina nota="fuera del radar" titulo="Prenda no encontrada">
          <span id={tituloId}>Puede que ya no esté en la curaduría.</span>
        </EncabezadoPagina>
        <Link to="/" className="font-bold text-arcilla underline underline-offset-4">
          Volver al inicio
        </Link>
      </div>
    )
    return esModal ? (
      <Modal tituloId={tituloId} onCerrar={cerrar}>
        {contenido}
      </Modal>
    ) : (
      contenido
    )
  }

  if (esModal) {
    return (
      <Modal tituloId={tituloId} onCerrar={cerrar}>
        <DetalleNarrativa prenda={prenda} tituloId={tituloId} esModal />
      </Modal>
    )
  }

  return (
    <article className="overflow-hidden rounded-bloque border border-algodon-oscuro bg-algodon">
      <TituloPagina texto={prenda.nombre} />
      <DetalleNarrativa prenda={prenda} tituloId={tituloId} esModal={false} />
    </article>
  )
}

import { Link } from 'react-router-dom'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import TituloPagina from '../components/ui/TituloPagina'

/** Página 404: la dirección no existe */
export default function NoEncontrada() {
  return (
    <>
      <TituloPagina texto="Página no encontrada" />
      <EncabezadoPagina nota="fuera del radar" titulo="Esta página no existe">
        Puede que el enlace esté mal escrito.
      </EncabezadoPagina>
      <Link
        to="/"
        className="inline-block rounded-full bg-arcilla px-6 py-3 font-bold text-white hover:bg-arcilla-oscura"
      >
        Volver al inicio
      </Link>
    </>
  )
}

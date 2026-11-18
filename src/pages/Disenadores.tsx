import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ATMOSFERAS, obtenerAtmosfera } from '../data/atmosferas'
import { DISENADORES } from '../data/disenadores'
import type { AtmosferaId } from '../data/tipos'
import EncabezadoPagina from '../components/ui/EncabezadoPagina'
import ChipsAtmosfera from '../components/prendas/ChipsAtmosfera'
import TarjetaDisenador from '../components/disenadores/TarjetaDisenador'
import FormularioPostular from '../components/disenadores/FormularioPostular'
import Modal from '../components/ui/Modal'
import PatronTextil from '../components/marca/PatronTextil'
import TituloPagina from '../components/ui/TituloPagina'

/** Directorio de diseñadores con filtro por atmósfera. */
export default function Disenadores() {
  const [params, setParams] = useSearchParams()
  const valor = params.get('atmosfera')
  const activa = ATMOSFERAS.some((a) => a.id === valor) ? (valor as AtmosferaId) : null
  const lista = DISENADORES.filter((d) => !activa || d.atmosfera === activa)

  const [postulando, setPostulando] = useState(false)

  return (
    <>
      <TituloPagina texto="Diseñadores" />
      <EncabezadoPagina nota="las manos detrás de cada prenda" titulo="Diseñadores">
        Marcas independientes curadas por atmósfera. Sigue a quienes te inspiran: la primera vez sumas puntos.
      </EncabezadoPagina>

      <div className="mb-4">
        <ChipsAtmosfera
          activa={activa}
          onCambiar={(id) => setParams(id ? { atmosfera: id } : {}, { preventScrollReset: true })}
        />
      </div>
      <p aria-live="polite" className="mb-6 text-gris-calido">
        {activa ? `${obtenerAtmosfera(activa).nombre}: ` : ''}
        <span className="font-semibold text-carbon">
          {lista.length} {lista.length === 1 ? 'diseñador' : 'diseñadores'}
        </span>
      </p>

      {lista.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((d) => (
            <li key={d.id}>
              <TarjetaDisenador disenador={d} nivel="h2" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-tarjeta border border-dashed border-gris-calido/60 bg-white p-6 text-gris-calido">
          Todavía no hay diseñadores en esta atmósfera. ¿Conoces alguna marca? Nomínala en Comunidad.
        </p>
      )}

      {/* Bloque para que nuevas marcas postulen (gratis) */}
      <section
        aria-labelledby="titulo-postular"
        className="mt-12 overflow-hidden rounded-bloque bg-carbon text-algodon sm:grid sm:grid-cols-[1fr_200px]"
      >
        <div className="p-6 sm:p-10">
          <p className="font-nota text-2xl text-ocre">para marcas locales</p>
          <h2 id="titulo-postular" className="font-editorial text-3xl leading-tight sm:text-4xl">
            ¿Eres diseñador o tienes una marca local? Crear tu perfil es gratis
          </h2>
          <p className="mt-3 max-w-2xl text-algodon/85">
            Perfil, narrativa, QR para ferias y reporte mensual sin costo. Tus ventas no pagan comisión.
          </p>
          <button
            type="button"
            onClick={() => setPostulando(true)}
            className="mt-6 rounded-full bg-arcilla px-6 py-3 font-bold text-white hover:bg-arcilla-oscura focus-visible:outline-ocre"
          >
            Postular mi marca
          </button>
        </div>
        <div className="hidden sm:block">
          <PatronTextil fondo="#1A1714" escala={56} />
        </div>
      </section>

      {postulando && (
        <Modal tituloId="titulo-form-postular" onCerrar={() => setPostulando(false)} ancho="max-w-xl">
          <FormularioPostular tituloId="titulo-form-postular" />
        </Modal>
      )}
    </>
  )
}

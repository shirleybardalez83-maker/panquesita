import { Link } from 'react-router-dom'
import LogoRadar from '../marca/LogoRadar'
import PatronTextil from '../marca/PatronTextil'
import { ENLACES_SECUNDARIOS } from '../../navegacion'

/** Pie de página: enlaces secundarios y aviso de privacidad (Ley 29733). */
export default function Pie() {
  return (
    <footer className="mt-16 border-t border-algodon-oscuro bg-white/70">
      {/* Franja textil decorativa */}
      <div className="h-3 overflow-hidden">
        <PatronTextil escala={24} />
      </div>
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <LogoRadar tamano={32} />
          <p className="mt-2 font-nota text-xl text-gris-calido">atmósferas curadas — no algorítmico</p>
        </div>

        <nav aria-label="Enlaces del pie">
          <ul className="space-y-2">
            {ENLACES_SECUNDARIOS.map((e) => (
              <li key={e.ruta}>
                <Link to={e.ruta} className="font-semibold text-carbon underline-offset-4 hover:underline">
                  {e.etiqueta}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm leading-relaxed text-gris-calido">
          <strong className="text-carbon">Privacidad:</strong> los escaneos de QR y tu progreso se tratan
          según la Ley N.º 29733, Ley de Protección de Datos Personales. En esta versión todo se guarda
          solo en tu navegador.
        </p>
      </div>
    </footer>
  )
}

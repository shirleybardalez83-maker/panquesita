import { useCallback, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import LogoRadar from '../marca/LogoRadar'
import { PESTANAS } from '../../navegacion'
import { IconoMenu, IconoPuntos } from './Iconos'
import Notificaciones from './Notificaciones'
import MenuMovil from './MenuMovil'
import { usePasaporte } from '../../hooks/usePasaporte'

/**
 * Barra superior fija: logo, pestañas, "Gratis para todos", puntos y notificaciones.
 * En celular las pestañas se esconden y aparece un botón de menú.
 */
export default function BarraSuperior() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  // useCallback mantiene la misma función entre renders (así el menú no se reinicia)
  const cerrarMenu = useCallback(() => setMenuAbierto(false), [])
  // Los puntos vienen del pasaporte compartido
  const { puntos } = usePasaporte()

  return (
    <header className="sticky top-0 z-40 border-b border-algodon-oscuro bg-algodon/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        {/* Logo: lleva al inicio */}
        <Link to="/" aria-label="RADAR, ir al inicio" className="flex min-h-11 shrink-0 items-center rounded-suave">
          {/* Debajo de 400 px solo se ve el símbolo, para que entren todos los botones */}
          <LogoRadar tamano={36} claseTexto="hidden xs:inline" />
        </Link>

        {/* Pestañas (solo desde tablet hacia arriba) */}
        <nav aria-label="Principal" className="ml-4 hidden md:block">
          <ul className="flex items-center gap-1">
            {PESTANAS.map((p) => (
              <li key={p.ruta}>
                <NavLink
                  to={p.ruta}
                  end={p.ruta === '/'}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-carbon text-algodon'
                        : 'text-gris-calido hover:bg-algodon-oscuro hover:text-carbon'
                    }`
                  }
                >
                  {p.etiqueta}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Etiqueta "Gratis para todos" (ocre de fondo, texto carbón) */}
          {/* En celular dice "Gratis"; desde escritorio, "Gratis para todos" */}
          <span className="rounded-full bg-ocre px-2.5 py-1 text-xs font-bold whitespace-nowrap text-carbon sm:px-3">
            Gratis<span className="hidden lg:inline"> para todos</span>
          </span>

          {/* Puntos del usuario: lleva al pasaporte */}
          <Link
            to="/pasaporte"
            className="flex min-h-11 items-center gap-1.5 rounded-full border border-algodon-oscuro bg-white px-3 py-1.5 text-sm font-bold text-carbon hover:border-carbon"
          >
            <IconoPuntos />
            <span>{puntos}</span>
            <span className="solo-lector">puntos, ver mi pasaporte</span>
            <span aria-hidden="true" className="hidden font-medium text-gris-calido sm:inline">
              pts
            </span>
          </Link>

          {/* Notificaciones (campana con panel) */}
          <Notificaciones />

          {/* Botón de menú (solo celular) */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto(true)}
            className="grid h-11 w-11 place-items-center rounded-full text-carbon hover:bg-algodon-oscuro md:hidden"
          >
            <IconoMenu />
          </button>
        </div>
      </div>

      <MenuMovil abierto={menuAbierto} onCerrar={cerrarMenu} />
    </header>
  )
}

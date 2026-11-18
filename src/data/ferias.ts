import type { Feria } from './tipos'

/**
 * Ferias físicas en Lima (EJEMPLOS FICTICIOS: fechas y participantes inventados).
 * `pin` es la posición en % sobre el mapa esquemático de Lima (x: izquierda→derecha, y: arriba→abajo).
 */
export const FERIAS: Feria[] = [
  {
    id: 'barranco',
    nombre: 'Feria Puente de los Suspiros',
    distrito: 'Barranco',
    fecha: '2026-11-29',
    horario: '11:00 – 20:00',
    pin: { x: 44, y: 76 },
    descripcion: 'Moda independiente, música en vivo y talleres de reparación junto al Puente de los Suspiros.',
    disenadores: ['lucia-quispe', 'mateo-rojas', 'valeria-rios'],
    documental: {
      titulo: 'Tintes de tierra en Chorrillos',
      descripcion: 'Mateo Rojas muestra cómo una arcilla roja se convierte en el color de un overol.',
    },
  },
  {
    id: 'miraflores',
    nombre: 'Mercado Creativo Kennedy',
    distrito: 'Miraflores',
    fecha: '2026-12-06',
    horario: '10:00 – 19:00',
    pin: { x: 46, y: 64 },
    descripcion: 'Una tarde de diseño de autor con pasarela abierta y charlas sobre trazabilidad textil.',
    disenadores: ['ana-flores', 'diego-paredes', 'valeria-rios'],
    documental: {
      titulo: 'Plata que parece encaje',
      descripcion: 'Un orfebre de Catacaos y Valeria Ríos arman, pieza por pieza, el Vestido Luna de Plata.',
    },
  },
  {
    id: 'centro',
    nombre: 'Encuentro Textil del Centro',
    distrito: 'Centro de Lima',
    fecha: '2026-12-13',
    horario: '10:00 – 18:00',
    pin: { x: 45, y: 30 },
    descripcion: 'Tejedoras y bordadoras de varias regiones en una casona del Centro, con demostraciones de telar.',
    disenadores: ['ana-flores', 'lucia-quispe', 'rosa-mamani'],
    documental: {
      titulo: 'Cuarenta días de telar',
      descripcion: "Las tejedoras de Taller Q'ori cuentan qué significa cada pallay de una manta.",
    },
  },
  {
    id: 'gamarra',
    nombre: 'Ruta de Talleres Gamarra',
    distrito: 'La Victoria (Gamarra)',
    fecha: '2026-12-20',
    horario: '09:00 – 17:00',
    pin: { x: 56, y: 40 },
    descripcion: 'Recorrido guiado por talleres que trabajan con retazos, tintes naturales y producción local.',
    disenadores: ['rosa-mamani', 'mateo-rojas', 'diego-paredes'],
    documental: {
      titulo: 'Lo que Gamarra descarta',
      descripcion: 'Diego Paredes recorre talleres buscando retazos de algodón pima para su próxima casaca.',
    },
  },
]

export function obtenerFeria(id: string): Feria | undefined {
  return FERIAS.find((f) => f.id === id)
}

/** Ferias ordenadas por fecha (la más próxima primero) */
export const FERIAS_POR_FECHA = [...FERIAS].sort((a, b) => a.fecha.localeCompare(b.fecha))

/** Ferias en las que participa un diseñador, ordenadas por fecha */
export function feriasDeDisenador(disenadorId: string): Feria[] {
  return FERIAS.filter((f) => f.disenadores.includes(disenadorId)).sort((a, b) => a.fecha.localeCompare(b.fecha))
}

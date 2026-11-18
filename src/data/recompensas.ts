import type { Recompensa } from './tipos'

/**
 * Recompensas GRATIS por participar.
 * Se canjean solo con puntos, y los puntos se ganan sin comprar nada.
 */
export function obtenerRecompensa(id: string): Recompensa | undefined {
  return RECOMPENSAS.find((r) => r.id === id)
}

export const RECOMPENSAS: Recompensa[] = [
  {
    id: 'micro-documental',
    nombre: 'Micro-documental exclusivo',
    descripcion: 'Un corto detrás de cámaras en el taller de una de las marcas de la semana.',
    puntos: 150,
  },
  {
    id: 'taller-bordado',
    nombre: 'Cupo en taller de bordado',
    descripcion: 'Una sesión presencial de bordado con una artesana invitada.',
    puntos: 250,
  },
  {
    id: 'encuentro-disenadores',
    nombre: 'Encuentro con diseñadores',
    descripcion: 'Una conversación en grupo pequeño con diseñadores de RADAR.',
    puntos: 400,
  },
]

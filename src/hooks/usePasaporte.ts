import { createContext, useContext } from 'react'

/**
 * Pasaporte de la persona usuaria: puntos y progreso.
 * Este archivo define QUÉ datos hay y el hook para leerlos.
 * El componente que los guarda en localStorage está en PasaporteProvider.tsx.
 */

/** Un escaneo de QR en una feria */
export type Escaneo = { feriaId: string; fecha: string }

/** Una recompensa canjeada, con su código simulado */
export type Canje = { recompensaId: string; codigo: string; fecha: string }

/** Una línea del historial (alimenta la campana de notificaciones) */
export type Actividad = { id: string; texto: string; fecha: string; puntos?: number }

/** Una marca nominada por la persona usuaria */
export type MiNominacion = { id: string; marca: string; enlace: string; motivo: string; fecha: string; conPuntos: boolean }

/** Resultado de intentar nominar */
export type ResultadoNominacion = 'con-puntos' | 'sin-puntos' | 'repetida'

/** Lo que guardamos */
export type EstadoPasaporte = {
  /** Puntos ACUMULADOS: nunca bajan y definen el nivel */
  puntos: number
  seguidos: string[] // ids de diseñadores que sigues ahora
  seguidosAlgunaVez: string[] // para dar puntos solo la primera vez
  escaneos: Escaneo[]
  canjes: Canje[]
  votoAtmosfera: string | null // id de la candidata votada (un solo voto)
  nominaciones: MiNominacion[]
  actividad: Actividad[] // la más reciente primero
  noLeidas: number // cuántas notificaciones no has visto
}

/** Lo que ofrece el hook a los componentes */
export type ValorPasaporte = EstadoPasaporte & {
  /** Saldo para canjear = acumulados − puntos ya canjeados */
  saldo: number
  estaSiguiendo: (id: string) => boolean
  /** true si seguir a este diseñador todavía da puntos */
  daPuntosSeguir: (id: string) => boolean
  alternarSeguir: (id: string, nombre: string) => void
  /** Devuelve el escaneo de esa feria, si ya se hizo */
  escaneoDe: (feriaId: string) => Escaneo | undefined
  /** true si escaneaste alguna feria donde participa ese diseñador */
  escaneasteADisenador: (disenadorId: string) => boolean
  /** Registra el escaneo; devuelve false si ya estaba escaneada */
  escanearFeria: (feriaId: string) => boolean
  canjeDe: (recompensaId: string) => Canje | undefined
  /** Canjea; devuelve false si no alcanza el saldo o ya estaba canjeada */
  canjear: (recompensaId: string) => boolean
  /** Vota la próxima atmósfera; devuelve false si ya votaste */
  votar: (candidataId: string, nombre: string) => boolean
  nominar: (datos: { marca: string; enlace: string; motivo: string }) => ResultadoNominacion
  marcarLeidas: () => void
  reiniciar: () => void
  /** Muestra un aviso breve abajo de la pantalla */
  avisar: (texto: string) => void
}

export const ContextoPasaporte = createContext<ValorPasaporte | null>(null)

/** Hook para leer y modificar el pasaporte desde cualquier componente */
export function usePasaporte(): ValorPasaporte {
  const valor = useContext(ContextoPasaporte)
  if (!valor) throw new Error('usePasaporte debe usarse dentro de <PasaporteProvider>')
  return valor
}

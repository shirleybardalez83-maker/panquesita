/**
 * Tipos de datos de RADAR.
 * Un "tipo" describe la forma de un dato: qué campos tiene y de qué clase es cada uno.
 * Si a una prenda le falta un campo, TypeScript nos avisa antes de abrir el navegador.
 */

/** Identificadores válidos de atmósfera (solo pueden ser estos cuatro) */
export type AtmosferaId = 'andino-futurista' | 'urbano-sostenible' | 'textil-ancestral' | 'noche-alternativa'

export type Atmosfera = {
  id: AtmosferaId
  nombre: string
  descripcion: string
}

/** Un lugar real del Perú, con sus coordenadas para dibujarlo en el mapa */
export type Lugar = {
  lugar: string // ej. "Azángaro"
  region: string // ej. "Puno"
  lat: number // latitud (negativa = sur)
  lon: number // longitud (negativa = oeste)
}

export type Disenador = {
  id: string
  nombre: string
  iniciales: string
  marca: string
  ciudad: string
  atmosfera: AtmosferaId
  foto?: string // opcional: si no hay, se muestran las iniciales
  portada: string
  banner: string
  destacado: boolean // true = tiene la "Mejora de perfil"
  seguidores: number
  descripcionCorta: string
  cita: string
  biografia: string
  taller: { nombre: string; lugar: string; descripcion: string }
  insumos: string[]
  ferias: string[] // ids de ferias
}

export type Prenda = {
  id: string
  nombre: string
  disenador: string // id del diseñador
  atmosfera: AtmosferaId
  imagen: string
  origen1: Lugar // de dónde viene el insumo
  origen2: Lugar // dónde está el taller
  insumo: string
  cita: string
  historia: string
}

export type Feria = {
  id: string
  nombre: string
  distrito: string
  fecha: string // formato AAAA-MM-DD
  horario: string
  pin: { x: number; y: number } // posición en % sobre el mapa de Lima
  descripcion: string
  disenadores: string[] // ids de diseñadores
  /** Micro-documental que se desbloquea al escanear el QR en esta feria */
  documental: { titulo: string; descripcion: string }
}

export type Recompensa = {
  id: string
  nombre: string
  descripcion: string
  puntos: number
}

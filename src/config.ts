/**
 * Configuración central de RADAR.
 * Si quieres cambiar cuántos puntos da una acción o el precio de la
 * mejora de perfil, cámbialo aquí y se actualiza en toda la app.
 */

/** Puntos que gana la persona usuaria por cada acción (todas gratis, sin comprar). */
export const PUNTOS = {
  seguirDisenador: 5, // solo la primera vez que sigue a alguien
  votarAtmosfera: 10, // un voto por persona
  nominarMarca: 20,
  escanearFeria: 50, // una vez por feria
} as const

/** Máximo de prendas por atmósfera en el feed: no hay scroll infinito. */
export const MAX_PRENDAS_POR_ATMOSFERA = 12

/** Duración (en segundos) del audio "Mi inspiración" de cada prenda. */
export const DURACION_NARRATIVA = 45

/** Cuántas nominaciones de marcas distintas dan puntos (evita inflar puntos) */
export const MAX_NOMINACIONES_CON_PUNTOS = 3

/** Niveles del pasaporte según los puntos acumulados. */
export const NIVELES = [
  { nombre: 'Curiosa', desde: 0 },
  { nombre: 'Exploradora', desde: 200 },
  { nombre: 'Curadora', desde: 400 },
] as const

/**
 * "Mejora de perfil": lo ÚNICO de pago en RADAR.
 * Es opcional y solo para marcas o diseñadores. No hay pasarela de pago:
 * el botón muestra un formulario de interés.
 */
export const MEJORA_PERFIL = {
  precioMensual: 79,
  moneda: 'S/',
  beneficios: [
    'Insignia "Perfil destacado"',
    'Portada editorial',
    'Sesión de fotos o cápsula audiovisual',
    'Estadísticas avanzadas',
  ],
} as const

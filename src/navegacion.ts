/**
 * Datos de navegación: pestañas principales y los 5 pasos del recorrido.
 * Tenerlos en un solo archivo evita repetirlos en la barra y en el menú móvil.
 */
import { NARRATIVA_SEMANA_ID } from './data/prendas'

/** Pestañas de la barra superior */
export const PESTANAS = [
  { ruta: '/', etiqueta: 'Inicio' },
  { ruta: '/disenadores', etiqueta: 'Diseñadores' },
  { ruta: '/ferias', etiqueta: 'Ferias' },
  { ruta: '/pasaporte', etiqueta: 'Pasaporte' },
] as const

/** Enlaces secundarios (pie y menú móvil) */
export const ENLACES_SECUNDARIOS = [
  { ruta: '/comunidad', etiqueta: 'Comunidad' },
  { ruta: '/marcas', etiqueta: 'Para marcas' },
  { ruta: '/como-funciona', etiqueta: 'Cómo funciona' },
] as const

/** Los 5 pasos del recorrido de la persona usuaria */
export const PASOS = [
  { numero: 1, titulo: 'Descubre', detalle: 'atmósferas', ruta: '/' },
  // Abre la "Narrativa de la semana"
  { numero: 2, titulo: 'Escucha', detalle: 'la narrativa', ruta: `/prenda/${NARRATIVA_SEMANA_ID}` },
  { numero: 3, titulo: 'Conoce', detalle: 'al diseñador', ruta: '/disenadores' },
  { numero: 4, titulo: 'Visita', detalle: 'la feria y escanea', ruta: '/ferias' },
  { numero: 5, titulo: 'Gana', detalle: 'puntos y vuelve', ruta: '/pasaporte' },
] as const

/**
 * Según la dirección actual, devuelve en qué paso está la persona.
 * Devuelve null en páginas que no son parte del recorrido (por ejemplo /marcas).
 */
export function pasoActual(ruta: string): number | null {
  if (ruta === '/') return 1
  if (ruta.startsWith('/prenda')) return 2
  if (ruta.startsWith('/disenadores')) return 3
  if (ruta.startsWith('/ferias')) return 4
  if (ruta.startsWith('/pasaporte')) return 5
  return null
}

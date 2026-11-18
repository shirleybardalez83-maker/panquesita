import { NIVELES } from '../config'

/**
 * Calcula el nivel del pasaporte según los puntos acumulados.
 * Devuelve el nivel actual, el siguiente (si existe), cuántos puntos faltan
 * y el porcentaje de avance hacia el siguiente nivel.
 */
export function calcularNivel(puntos: number) {
  // Recorremos de mayor a menor y nos quedamos con el primero alcanzado
  const indice = [...NIVELES].reverse().findIndex((n) => puntos >= n.desde)
  const posicion = NIVELES.length - 1 - indice
  const actual = NIVELES[posicion]
  const siguiente = NIVELES[posicion + 1]

  if (!siguiente) return { actual, siguiente: undefined, faltan: 0, porcentaje: 100 }

  const tramo = siguiente.desde - actual.desde
  return {
    actual,
    siguiente,
    faltan: siguiente.desde - puntos,
    porcentaje: Math.round(((puntos - actual.desde) / tramo) * 100),
  }
}

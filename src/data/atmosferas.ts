import type { Atmosfera, AtmosferaId } from './tipos'

/** Las atmósferas culturales con las que se cura el feed (no hay algoritmo). */
export const ATMOSFERAS: Atmosfera[] = [
  {
    id: 'andino-futurista',
    nombre: 'Andino Futurista',
    descripcion: 'Iconografía andina reinterpretada con cortes técnicos, capas modulares y materiales recuperados.',
  },
  {
    id: 'urbano-sostenible',
    nombre: 'Urbano Sostenible',
    descripcion: 'Ropa para moverse por Lima: algodón peruano, tintes naturales y retazos que vuelven a la calle.',
  },
  {
    id: 'textil-ancestral',
    nombre: 'Textil Ancestral',
    descripcion: 'Telar, bordado y pallay: técnicas heredadas, contadas por quienes las practican hoy.',
  },
  {
    id: 'noche-alternativa',
    nombre: 'Noche Alternativa',
    descripcion: 'Brillo, contraste y materiales amazónicos y de filigrana para la escena nocturna independiente.',
  },
]

/** Busca una atmósfera por su id */
export function obtenerAtmosfera(id: AtmosferaId): Atmosfera {
  // El "!" le dice a TypeScript que siempre existe (los ids están limitados por el tipo)
  return ATMOSFERAS.find((a) => a.id === id)!
}

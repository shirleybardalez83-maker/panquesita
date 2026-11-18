/**
 * Datos de la Comunidad (EJEMPLOS FICTICIOS).
 * - Candidatas a la próxima atmósfera, con votos simulados de la comunidad.
 * - Nominaciones de marcas hechas por otras personas, con su estado.
 */

export type Candidata = {
  id: string
  nombre: string
  descripcion: string
  votosBase: number // votos simulados de la comunidad
}

export const CANDIDATAS: Candidata[] = [
  {
    id: 'selva-contemporanea',
    nombre: 'Selva Contemporánea',
    descripcion: 'Fibras y semillas amazónicas en prendas urbanas, con artesanas de Ucayali y Loreto.',
    votosBase: 142,
  },
  {
    id: 'costa-chicha',
    nombre: 'Costa Chicha',
    descripcion: 'Colores fosforescentes y tipografías de afiche chicha llevados a la ropa.',
    votosBase: 168,
  },
  {
    id: 'altiplano-minimal',
    nombre: 'Altiplano Minimal',
    descripcion: 'Lana y alpaca en cortes limpios, tonos tierra y cero estampado.',
    votosBase: 97,
  },
  {
    id: 'lima-retro',
    nombre: 'Lima Retro',
    descripcion: 'Ropa vintage limeña rescatada y reconstruida: de los 70 a los 90.',
    votosBase: 121,
  },
]

export type EstadoNominacion = 'Recibida' | 'En curaduría' | 'Aceptada'

export type Nominacion = {
  id: string
  marca: string
  motivo: string
  estado: EstadoNominacion
}

/** Nominaciones de otras personas (simuladas) */
export const NOMINACIONES_COMUNIDAD: Nominacion[] = [
  { id: 'n1', marca: 'Kallpa Tejidos', motivo: 'Chompas con lana reciclada hechas en Villa El Salvador.', estado: 'Aceptada' },
  { id: 'n2', marca: 'Sereno Studio', motivo: 'Ropa de noche con retazos de terciopelo.', estado: 'En curaduría' },
  { id: 'n3', marca: 'Tinta Muña', motivo: 'Teñido con plantas de los Andes, muy poco conocido.', estado: 'En curaduría' },
  { id: 'n4', marca: 'Huellas Shipibas', motivo: 'Kené pintado a mano sobre algodón orgánico.', estado: 'Recibida' },
]

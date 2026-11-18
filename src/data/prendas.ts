import type { Lugar, Prenda } from './tipos'

/**
 * Prendas del feed curado (EJEMPLOS FICTICIOS).
 * Imágenes esperadas en public/img/prendas/p1.jpg … p9.jpg
 */

/** Lugares reutilizables (coordenadas aproximadas) */
const L = {
  azangaro: { lugar: 'Azángaro', region: 'Puno', lat: -14.91, lon: -70.19 },
  juliaca: { lugar: 'Juliaca', region: 'Puno', lat: -15.5, lon: -70.13 },
  chinchero: { lugar: 'Chinchero', region: 'Cusco', lat: -13.39, lon: -72.05 },
  pitumarca: { lugar: 'Pitumarca', region: 'Cusco', lat: -13.98, lon: -71.42 },
  ayacucho: { lugar: 'Huamanga', region: 'Ayacucho', lat: -13.16, lon: -74.22 },
  ica: { lugar: 'Ica', region: 'Ica', lat: -14.07, lon: -75.73 },
  piura: { lugar: 'Piura', region: 'Piura', lat: -5.19, lon: -80.63 },
  catacaos: { lugar: 'Catacaos', region: 'Piura', lat: -5.27, lon: -80.67 },
  maldonado: { lugar: 'Puerto Maldonado', region: 'Madre de Dios', lat: -12.59, lon: -69.19 },
  sjl: { lugar: 'San Juan de Lurigancho', region: 'Lima', lat: -11.98, lon: -77.0 },
  chorrillos: { lugar: 'Chorrillos', region: 'Lima', lat: -12.17, lon: -77.02 },
  surquillo: { lugar: 'Surquillo', region: 'Lima', lat: -12.11, lon: -77.02 },
  barranco: { lugar: 'Barranco', region: 'Lima', lat: -12.15, lon: -77.02 },
} satisfies Record<string, Lugar>

const imagen = (id: string) => `/img/prendas/${id}.jpg`

export const PRENDAS: Prenda[] = [
  {
    id: 'p1',
    nombre: 'Chaqueta Chakana Reflectiva',
    disenador: 'lucia-quispe',
    atmosfera: 'andino-futurista',
    imagen: imagen('p1'),
    origen1: L.azangaro,
    origen2: L.sjl,
    insumo: 'Alpaca reciclada y cinta reflectiva recuperada',
    cita: 'Quería que la chakana se viera de noche, cuando vuelves a casa en la combi.',
    historia:
      'La chakana del pecho está hecha con cinta reflectiva de uniformes en desuso. El cuerpo es de alpaca reciclada de Azángaro, cortada en paneles que se pueden reemplazar si se gastan.',
  },
  {
    id: 'p2',
    nombre: 'Poncho Modular Apu',
    disenador: 'lucia-quispe',
    atmosfera: 'andino-futurista',
    imagen: imagen('p2'),
    origen1: L.chinchero,
    origen2: L.sjl,
    insumo: 'Tejido de alpaca de Chinchero con botones de tagua',
    cita: 'Un poncho que se abre y se cierra según el clima de Lima: imposible de predecir.',
    historia:
      'Tres módulos que se abotonan entre sí: puedes usarlo como poncho, como chaleco o como bufanda. La tela viene de tejedoras de Chinchero y se ensambla en el taller familiar de Lucía.',
  },
  {
    id: 'p3',
    nombre: "Manta Q'ori de Telar",
    disenador: 'ana-flores',
    atmosfera: 'textil-ancestral',
    imagen: imagen('p3'),
    origen1: L.pitumarca,
    origen2: L.chinchero,
    insumo: 'Fibra de alpaca hilada a mano y teñida con cochinilla',
    cita: 'Esta manta tardó cuarenta días. Cada día tiene su propio pallay.',
    historia:
      'Tejida en telar de cintura por Marina, del colectivo de Chinchero. El rojo viene de la cochinilla y el dorado de la chilca. El pallay central representa el camino entre Pitumarca, donde se hiló la fibra, y Chinchero.',
  },
  {
    id: 'p4',
    nombre: 'Chaleco Pallay',
    disenador: 'ana-flores',
    atmosfera: 'textil-ancestral',
    imagen: imagen('p4'),
    origen1: L.ayacucho,
    origen2: L.chinchero,
    insumo: 'Lana de oveja criolla de Ayacucho',
    cita: 'El pallay no se copia: se aprende mirando, equivocándose y volviendo a empezar.',
    historia:
      'Un chaleco de corte recto con una franja de pallay en la espalda. La lana llega de Huamanga y se tiñe en Chinchero con q’olle, que da un amarillo intenso.',
  },
  {
    id: 'p5',
    nombre: 'Falda Wayta Bordada',
    disenador: 'rosa-mamani',
    atmosfera: 'textil-ancestral',
    imagen: imagen('p5'),
    origen1: L.azangaro,
    origen2: L.juliaca,
    insumo: 'Bayeta de lana de oveja y bordado de algodón',
    cita: 'Antes estas flores solo salían en la fiesta. Ahora salen todos los días.',
    historia:
      'La bayeta se teje en telar de pedal en Azángaro y se borda en Juliaca. Las flores son las mismas de las polleras de la Candelaria, en una falda que se usa para ir a clases o al trabajo.',
  },
  {
    id: 'p6',
    nombre: 'Overol Tierra',
    disenador: 'mateo-rojas',
    atmosfera: 'urbano-sostenible',
    imagen: imagen('p6'),
    origen1: L.ica,
    origen2: L.chorrillos,
    insumo: 'Algodón orgánico de Ica teñido con arcilla',
    cita: 'Este color no sale igual dos veces. Depende de la tierra y del sol de ese día.',
    historia:
      'Algodón orgánico de Ica teñido en Chorrillos con arcillas rojas. El agua del teñido se filtra y se reutiliza. Si se rompe, Barro Lab lo repara gratis.',
  },
  {
    id: 'p7',
    nombre: 'Casaca Retazo Pima',
    disenador: 'diego-paredes',
    atmosfera: 'urbano-sostenible',
    imagen: imagen('p7'),
    origen1: L.piura,
    origen2: L.surquillo,
    insumo: 'Retazos de algodón pima de Piura recuperados en Gamarra',
    cita: 'Cada retazo viene de un taller distinto. La casaca es un mapa de Gamarra.',
    historia:
      'Hecha con 23 retazos de algodón pima que iban a desecharse. La etiqueta interior lista los talleres de donde salió cada tela. Ninguna casaca es igual a otra.',
  },
  {
    id: 'p8',
    nombre: 'Vestido Luna de Plata',
    disenador: 'valeria-rios',
    atmosfera: 'noche-alternativa',
    imagen: imagen('p8'),
    origen1: L.catacaos,
    origen2: L.barranco,
    insumo: 'Satén de algodón con filigrana de plata de Catacaos',
    cita: 'La filigrana de Catacaos es tan fina como un encaje, pero de plata.',
    historia:
      'Un vestido negro de satén con aplicaciones de filigrana hechas por un orfebre de Catacaos. Las piezas se cosen a mano en Barranco y se pueden desmontar para usarlas como joya.',
  },
  {
    id: 'p9',
    nombre: 'Top Huayruro',
    disenador: 'valeria-rios',
    atmosfera: 'noche-alternativa',
    imagen: imagen('p9'),
    origen1: L.maldonado,
    origen2: L.barranco,
    insumo: 'Semillas de huayruro recolectadas del suelo del bosque',
    cita: 'El huayruro es de buena suerte. Para salir de noche, nunca está de más.',
    historia:
      'Las semillas se recolectan del suelo, sin cortar árboles, por una asociación de artesanas de Madre de Dios. Se bordan sobre una base de algodón en Barranco.',
  },
]

/** Id de la prenda destacada como "Narrativa de la semana" */
export const NARRATIVA_SEMANA_ID = 'p3'

/** Prendas de un diseñador */
export function prendasDeDisenador(disenadorId: string): Prenda[] {
  return PRENDAS.filter((p) => p.disenador === disenadorId)
}

export function obtenerPrenda(id: string): Prenda | undefined {
  return PRENDAS.find((p) => p.id === id)
}

import type { Disenador } from './tipos'

/**
 * Diseñadores y marcas de RADAR.
 *
 * ⚠ EJEMPLOS FICTICIOS: estas personas, marcas e historias son inventadas
 * para la demo. Cualquier parecido con personas reales es coincidencia.
 *
 * Imágenes esperadas en public/img/disenadores/:
 *   <id>.jpg (foto, opcional) · <id>-portada.jpg · <id>-banner.jpg
 */

/** Arma las rutas de imagen de un diseñador a partir de su id */
const img = (id: string) => ({
  portada: `/img/disenadores/${id}-portada.jpg`,
  banner: `/img/disenadores/${id}-banner.jpg`,
})

export const DISENADORES: Disenador[] = [
  {
    id: 'ana-flores',
    nombre: 'Ana Flores',
    iniciales: 'AF',
    marca: "Taller Q'ori",
    ciudad: 'Cusco',
    atmosfera: 'textil-ancestral',
    foto: '/img/disenadores/ana-flores.jpg',
    ...img('ana-flores'),
    destacado: true,
    seguidores: 1240,
    descripcionCorta: 'Mantas y chalecos en telar de cintura, con pallay aprendido de su abuela en Chinchero.',
    cita: 'Cada pallay es una palabra. Yo solo sigo escribiendo la conversación que empezó mi abuela.',
    biografia:
      'Ana creció entre telares en Chinchero y estudió diseño en Lima. Volvió a Cusco para trabajar con un colectivo de seis tejedoras: ellas definen los diseños, Ana los traduce a prendas que se usan en la ciudad. Cada pieza lleva el nombre de quien la tejió.',
    taller: {
      nombre: "Taller Q'ori",
      lugar: 'Chinchero, Cusco',
      descripcion: 'Colectivo de seis tejedoras con telar de cintura y tintes naturales de cochinilla, chilca y q’olle.',
    },
    insumos: ['Fibra de alpaca hilada a mano', 'Tintes naturales de cochinilla y chilca', 'Lana de oveja criolla'],
    ferias: ['miraflores', 'centro'],
  },
  {
    id: 'lucia-quispe',
    nombre: 'Lucía Quispe',
    iniciales: 'LQ',
    marca: 'Apu Studio',
    ciudad: 'Lima (San Juan de Lurigancho)',
    atmosfera: 'andino-futurista',
    ...img('lucia-quispe'),
    destacado: false,
    seguidores: 860,
    descripcionCorta: 'Ponchos modulares y chaquetas técnicas que llevan la chakana a la ciudad.',
    cita: 'Los apus cuidaban a quien caminaba. Yo quiero ropa que haga lo mismo en la ciudad.',
    biografia:
      'Lucía es hija de migrantes de Huancavelica y creció en San Juan de Lurigancho. Combina patronaje técnico con geometrías andinas y trabaja con alpaca reciclada y cintas reflectivas recuperadas de uniformes en desuso.',
    taller: {
      nombre: 'Apu Studio',
      lugar: 'San Juan de Lurigancho, Lima',
      descripcion: 'Taller familiar con dos máquinas rectas y una remalladora; la madre de Lucía dirige el corte.',
    },
    insumos: ['Alpaca reciclada', 'Cinta reflectiva recuperada', 'Botones de tagua'],
    ferias: ['barranco', 'centro'],
  },
  {
    id: 'rosa-mamani',
    nombre: 'Rosa Mamani',
    iniciales: 'RM',
    marca: 'Wayta Atelier',
    ciudad: 'Juliaca',
    atmosfera: 'textil-ancestral',
    foto: '/img/disenadores/rosa-mamani.jpg',
    ...img('rosa-mamani'),
    destacado: false,
    seguidores: 530,
    descripcionCorta: 'Faldas y blusas con bordado floral del altiplano, hechas para el día a día.',
    cita: '“Wayta” es flor. En el altiplano las flores aguantan la helada; mis bordados también.',
    biografia:
      'Rosa aprendió a bordar polleras para las fiestas de la Candelaria. Hoy lleva ese bordado a faldas y blusas de uso diario y enseña a jóvenes de Juliaca a vivir de su oficio.',
    taller: {
      nombre: 'Wayta Atelier',
      lugar: 'Juliaca, Puno',
      descripcion: 'Taller de bordado a mano y a máquina; forma a cuatro aprendices cada año.',
    },
    insumos: ['Lana de oveja de Azángaro', 'Hilo de bordado de algodón', 'Bayeta tejida en telar de pedal'],
    ferias: ['centro', 'gamarra'],
  },
  {
    id: 'mateo-rojas',
    nombre: 'Mateo Rojas',
    iniciales: 'MR',
    marca: 'Barro Lab',
    ciudad: 'Lima (Chorrillos)',
    atmosfera: 'urbano-sostenible',
    ...img('mateo-rojas'),
    destacado: false,
    seguidores: 710,
    descripcionCorta: 'Overoles y básicos de algodón orgánico teñidos con arcilla y tierras de color.',
    cita: 'La tierra ya tiene todos los colores que necesito. Solo hay que aprender a pedírselos.',
    biografia:
      'Mateo estudió ingeniería textil y trabajó en una fábrica de fast fashion. Lo dejó para experimentar con tintes de arcilla y algodón orgánico de Ica. Hace tiradas cortas y repara gratis lo que vende.',
    taller: {
      nombre: 'Barro Lab',
      lugar: 'Chorrillos, Lima',
      descripcion: 'Laboratorio de tintes minerales con agua reutilizada; tiradas de 30 piezas como máximo.',
    },
    insumos: ['Algodón orgánico de Ica', 'Arcillas y óxidos de tierra', 'Hilo de algodón reciclado'],
    ferias: ['barranco', 'gamarra'],
  },
  {
    id: 'diego-paredes',
    nombre: 'Diego Paredes',
    iniciales: 'DP',
    marca: 'Verde Lima',
    ciudad: 'Lima (Surquillo)',
    atmosfera: 'urbano-sostenible',
    ...img('diego-paredes'),
    destacado: true,
    seguidores: 1530,
    descripcionCorta: 'Casacas y pantalones armados con retazos de algodón pima que la industria descarta.',
    cita: 'En Gamarra se bota lo que en otro lado sería un tesoro. Yo voy a buscar ese tesoro.',
    biografia:
      'Diego recorre los talleres de Gamarra recolectando retazos de algodón pima y los convierte en casacas de patchwork. Cada pieza es distinta y lleva una etiqueta con el taller de donde salió la tela.',
    taller: {
      nombre: 'Verde Lima',
      lugar: 'Surquillo, Lima',
      descripcion: 'Taller de confección con tres costureras; clasifica los retazos por tono y gramaje.',
    },
    insumos: ['Retazos de algodón pima', 'Denim recuperado', 'Cierres reutilizados'],
    ferias: ['miraflores', 'gamarra'],
  },
  {
    id: 'valeria-rios',
    nombre: 'Valeria Ríos',
    iniciales: 'VR',
    marca: 'Noctámbula',
    ciudad: 'Lima (Barranco)',
    atmosfera: 'noche-alternativa',
    foto: '/img/disenadores/valeria-rios.jpg',
    ...img('valeria-rios'),
    destacado: false,
    seguidores: 980,
    descripcionCorta: 'Piezas de noche con filigrana de Catacaos y semillas amazónicas.',
    cita: 'La noche limeña también es peruana. Quiero que brille con lo nuestro, no con lo importado.',
    biografia:
      'Valeria viene de la escena musical de Barranco. Colabora con orfebres de Catacaos y con artesanas de Madre de Dios para crear piezas que se ven en la pista de baile y cuentan de dónde vienen.',
    taller: {
      nombre: 'Noctámbula',
      lugar: 'Barranco, Lima',
      descripcion: 'Estudio pequeño donde se ensamblan las aplicaciones de filigrana y semillas sobre cada prenda.',
    },
    insumos: ['Filigrana de plata de Catacaos', 'Semillas de huayruro', 'Satén de algodón'],
    ferias: ['barranco', 'miraflores'],
  },
]

/** Ids de los "Diseñadores de la semana" que aparecen en Inicio */
export const DISENADORES_SEMANA = ['ana-flores', 'lucia-quispe', 'valeria-rios']

/** Busca un diseñador por su id (devuelve undefined si no existe) */
export function obtenerDisenador(id: string): Disenador | undefined {
  return DISENADORES.find((d) => d.id === id)
}

/**
 * "¿Cómo se sostiene RADAR sin cobrar a nadie por lo básico?"
 * Se usa en el Panel de marcas y en Cómo funciona.
 */
const FUENTES = [
  {
    titulo: 'Mejora de perfil opcional',
    texto: 'Marcas que quieren más visibilidad pagan una mejora. Lo básico sigue siendo gratis.',
  },
  {
    titulo: 'Patrocinios de marcas sostenibles',
    texto: 'Empresas con prácticas responsables apoyan ferias y talleres, sin anuncios en el feed.',
  },
  { titulo: 'Crowdfunding', texto: 'La comunidad puede aportar de forma voluntaria a proyectos concretos.' },
  { titulo: 'StartUp Perú', texto: 'Fondos públicos para emprendimientos innovadores.' },
  {
    titulo: 'Estímulos Económicos del Ministerio de Cultura',
    texto: 'Convocatorias para proyectos de industrias culturales y creativas.',
  },
]

export default function Sostenibilidad({ titulo = '¿Cómo se sostiene RADAR sin cobrar a nadie por lo básico?' }) {
  return (
    <section aria-labelledby="titulo-sostenibilidad" className="rounded-bloque bg-carbon p-6 text-algodon sm:p-10">
      <p className="font-nota text-2xl text-ocre">sin letra pequeña</p>
      <h2 id="titulo-sostenibilidad" className="max-w-3xl font-editorial text-3xl leading-tight sm:text-4xl">
        {titulo}
      </h2>
      <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FUENTES.map((f, i) => (
          <li key={f.titulo} className="rounded-tarjeta bg-algodon/10 p-4">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-ocre text-sm font-extrabold text-carbon" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-3 font-bold">{f.titulo}</h3>
            <p className="mt-1 text-sm text-algodon/85">{f.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

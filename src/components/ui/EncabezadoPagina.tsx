import type { ReactNode } from 'react'

/**
 * Encabezado editorial que se repite en cada página:
 * nota a mano (Caveat) + titular (Italiana) + texto de apoyo.
 */
type Props = {
  nota?: string
  titulo: string
  children?: ReactNode
}

export default function EncabezadoPagina({ nota, titulo, children }: Props) {
  return (
    <header className="mb-8 max-w-3xl">
      {nota && <p className="font-nota text-2xl text-arcilla">{nota}</p>}
      <h1 className="font-editorial text-4xl leading-tight text-carbon sm:text-5xl lg:text-6xl">{titulo}</h1>
      {children && <div className="mt-3 text-lg leading-relaxed text-gris-calido">{children}</div>}
    </header>
  )
}

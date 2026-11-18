import { useState } from 'react'
import PatronTextil from '../marca/PatronTextil'

/**
 * Imagen con respaldo: intenta cargar la foto y, si no existe en public/img,
 * muestra el patrón textil con el nombre de la imagen.
 */
type Props = {
  src: string
  alt: string
  /** Nombre visible en el placeholder (por ejemplo el nombre de la prenda) */
  nombre?: string
  className?: string
}

export default function Imagen({ src, alt, nombre, className = '' }: Props) {
  // Guardamos QUÉ src falló; si cambia el src, se vuelve a intentar
  const [srcFallido, setSrcFallido] = useState<string | null>(null)

  if (srcFallido === src) {
    const archivo = src.split('/').pop()
    return (
      <div role="img" aria-label={alt} className={`relative overflow-hidden bg-algodon ${className}`}>
        <PatronTextil className="absolute inset-0" escala={72} />
        <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-suave bg-algodon/95 px-3 py-2 shadow-sm">
          {nombre && <p className="text-sm font-bold text-carbon">{nombre}</p>}
          <p className="font-mono text-xs text-gris-calido">{archivo}</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setSrcFallido(src)}
      className={`object-cover ${className}`}
    />
  )
}

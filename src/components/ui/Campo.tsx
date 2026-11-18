import type { ReactNode } from 'react'

/** Atributos que Campo le entrega al input para conectarlo con su etiqueta y error */
export type AtributosCampo = {
  id: string
  name: string
  required: boolean
  'aria-invalid': boolean | undefined
  'aria-describedby': string | undefined
  className: string
}

/**
 * Envuelve un campo con su etiqueta, ayuda y mensaje de error.
 * Recibe una función: le pasamos los atributos (id, aria-invalid...) y ella dibuja el input.
 * Así el lector de pantalla sabe qué etiqueta y qué error corresponden a cada campo.
 */
export default function Campo({
  id,
  etiqueta,
  error,
  ayuda,
  obligatorio = false,
  children,
}: {
  id: string
  etiqueta: string
  error?: string
  ayuda?: string
  obligatorio?: boolean
  children: (atributos: AtributosCampo) => ReactNode
}) {
  const descripciones = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-carbon">
        {etiqueta}
        {obligatorio && <span aria-hidden="true"> *</span>}
      </label>
      {ayuda && (
        <p id={`${id}-ayuda`} className="text-xs text-gris-calido">
          {ayuda}
        </p>
      )}
      {children({
        id,
        name: id,
        required: obligatorio,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': descripciones,
        className: `mt-1 block w-full rounded-suave border bg-white px-3 py-2.5 text-carbon ${
          error ? 'border-arcilla' : 'border-gris-calido/70'
        }`,
      })}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm font-semibold text-arcilla">
          {error}
        </p>
      )}
    </div>
  )
}

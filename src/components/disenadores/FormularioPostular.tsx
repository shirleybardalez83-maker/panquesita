import { useRef, useState, type FormEvent } from 'react'
import { ATMOSFERAS } from '../../data/atmosferas'
import Campo from '../ui/Campo'

/**
 * Formulario "Postular mi marca".
 * No hay servidor todavía: al enviar solo mostramos un mensaje de gracias.
 * Crear el perfil es GRATIS: aquí no se muestra ningún precio.
 */
type Campos = {
  nombre: string
  marca: string
  ciudad: string
  atmosfera: string
  enlace: string
  historia: string
}

const VACIO: Campos = { nombre: '', marca: '', ciudad: '', atmosfera: '', enlace: '', historia: '' }

/** Revisa los campos y devuelve los errores encontrados */
function validar(c: Campos): Partial<Record<keyof Campos, string>> {
  const errores: Partial<Record<keyof Campos, string>> = {}
  if (!c.nombre.trim()) errores.nombre = 'Escribe tu nombre.'
  if (!c.marca.trim()) errores.marca = 'Escribe el nombre de tu marca.'
  if (!c.ciudad.trim()) errores.ciudad = 'Cuéntanos en qué ciudad trabajas.'
  if (!c.atmosfera) errores.atmosfera = 'Elige la atmósfera que más se parece a tu marca.'
  if (c.historia.trim().length < 20) errores.historia = 'Cuéntanos tu historia en al menos 20 caracteres.'
  return errores
}

export default function FormularioPostular({ tituloId }: { tituloId: string }) {
  const [campos, setCampos] = useState<Campos>(VACIO)
  const [errores, setErrores] = useState<ReturnType<typeof validar>>({})
  const [enviado, setEnviado] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const graciasRef = useRef<HTMLHeadingElement>(null)

  // Actualiza un campo al escribir
  const cambiar = (nombre: keyof Campos) => (e: { target: { value: string } }) =>
    setCampos((c) => ({ ...c, [nombre]: e.target.value }))

  function enviar(e: FormEvent) {
    e.preventDefault() // evita que el navegador recargue la página
    const encontrados = validar(campos)
    setErrores(encontrados)
    const primero = Object.keys(encontrados)[0]
    if (primero) {
      // Llevamos el foco al primer campo con error
      formRef.current?.querySelector<HTMLElement>(`[name="${primero}"]`)?.focus()
      return
    }
    setEnviado(true)
    // Esperamos a que aparezca el mensaje y le pasamos el foco
    setTimeout(() => graciasRef.current?.focus(), 0)
  }

  if (enviado) {
    return (
      <div className="p-6 sm:p-8">
        <p className="font-nota text-2xl text-arcilla">¡recibido!</p>
        <h2 id={tituloId} ref={graciasRef} tabIndex={-1} className="font-editorial text-4xl text-carbon focus:outline-none">
          Gracias, {campos.nombre.split(' ')[0]}
        </h2>
        <p className="mt-3 leading-relaxed text-gris-calido">
          Revisaremos <strong className="text-carbon">{campos.marca}</strong> en la próxima curaduría y te
          escribiremos. Tu perfil, tu narrativa, tu QR y tu reporte mensual son gratis, y tus ventas no pagan comisión.
        </p>
        <p className="mt-4 text-sm text-gris-calido">
          Versión de demostración: esta postulación no se envió a ningún servidor.
        </p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="space-y-4 p-6 sm:p-8">
      <div className="pr-10">
        <p className="font-nota text-2xl text-arcilla">crear tu perfil es gratis</p>
        <h2 id={tituloId} className="font-editorial text-4xl text-carbon">
          Postula tu marca
        </h2>
        <p className="mt-2 text-sm text-gris-calido">
          Los campos con <span aria-hidden="true">*</span>
          <span className="solo-lector">asterisco</span> son obligatorios.
        </p>
      </div>

      <Campo id="nombre" etiqueta="Tu nombre" error={errores.nombre} obligatorio>
        {(attrs) => <input {...attrs} type="text" autoComplete="name" value={campos.nombre} onChange={cambiar('nombre')} />}
      </Campo>
      <div className="grid gap-4 sm:grid-cols-2">
        <Campo id="marca" etiqueta="Nombre de la marca" error={errores.marca} obligatorio>
          {(attrs) => (
            <input {...attrs} type="text" autoComplete="organization" value={campos.marca} onChange={cambiar('marca')} />
          )}
        </Campo>
        <Campo id="ciudad" etiqueta="Ciudad" error={errores.ciudad} obligatorio>
          {(attrs) => (
            <input {...attrs} type="text" autoComplete="address-level2" value={campos.ciudad} onChange={cambiar('ciudad')} />
          )}
        </Campo>
      </div>
      <Campo id="atmosfera" etiqueta="Atmósfera" error={errores.atmosfera} obligatorio>
        {(attrs) => (
          <select {...attrs} value={campos.atmosfera} onChange={cambiar('atmosfera')}>
            <option value="">Elige una opción</option>
            {ATMOSFERAS.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nombre}
              </option>
            ))}
          </select>
        )}
      </Campo>
      <Campo id="enlace" etiqueta="Instagram o web" ayuda="Opcional. Ej.: @tumarca">
        {(attrs) => <input {...attrs} type="text" value={campos.enlace} onChange={cambiar('enlace')} />}
      </Campo>
      <Campo id="historia" etiqueta="Tu historia en pocas líneas" error={errores.historia} obligatorio>
        {(attrs) => <textarea {...attrs} rows={4} value={campos.historia} onChange={cambiar('historia')} />}
      </Campo>

      <button
        type="submit"
        className="w-full rounded-full bg-arcilla px-6 py-3 font-bold text-white hover:bg-arcilla-oscura sm:w-auto"
      >
        Enviar postulación
      </button>
    </form>
  )
}

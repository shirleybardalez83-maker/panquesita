/**
 * Cambia el título de la pestaña del navegador (ej. "Ferias · RADAR").
 * React 19 permite poner <title> dentro de cualquier componente y lo lleva al <head>.
 * WCAG pide que cada página tenga un título que la describa.
 */
export default function TituloPagina({ texto }: { texto?: string }) {
  return <title>{texto ? `${texto} · RADAR` : 'RADAR · Moda peruana independiente'}</title>
}

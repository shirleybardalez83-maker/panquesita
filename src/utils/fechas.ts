/**
 * Convierte "2026-11-29" en un texto legible como "sáb. 29 nov.".
 * Fijamos el mediodía en hora de Lima para evitar que la fecha "salte" un día
 * por diferencias de zona horaria.
 */
export function formatearFecha(fecha: string, largo = false): string {
  const d = new Date(`${fecha}T12:00:00-05:00`)
  return new Intl.DateTimeFormat('es-PE', {
    weekday: largo ? 'long' : 'short',
    day: 'numeric',
    month: largo ? 'long' : 'short',
    timeZone: 'America/Lima',
  }).format(d)
}

/** Convierte segundos en "m:ss" (por ejemplo 75 → "1:15") */
export function formatearTiempo(segundos: number): string {
  const s = Math.floor(segundos)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** Separa una fecha en día y mes corto, para el bloque tipo calendario (ej. { dia: 29, mes: "nov" }) */
export function partesFecha(fecha: string): { dia: number; mes: string } {
  const d = new Date(`${fecha}T12:00:00-05:00`)
  const mes = new Intl.DateTimeFormat('es-PE', { month: 'short', timeZone: 'America/Lima' }).format(d)
  return { dia: Number(fecha.slice(8, 10)), mes: mes.replace('.', '') }
}

/** "domingo, 20 de diciembre" → "Domingo, 20 de diciembre" */
export function mayusculaInicial(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1)
}

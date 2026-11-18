import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { MAX_NOMINACIONES_CON_PUNTOS, PUNTOS } from '../config'
import { FERIAS, obtenerFeria } from '../data/ferias'
import { obtenerRecompensa } from '../data/recompensas'
import { ContextoPasaporte, type EstadoPasaporte, type ResultadoNominacion, type ValorPasaporte } from './usePasaporte'

/**
 * Proveedor del pasaporte.
 * - Guarda el progreso en localStorage (solo en este navegador, sin servidor).
 * - Lo comparte con toda la app mediante un "Context": cualquier componente
 *   puede leerlo con usePasaporte() y todos se actualizan a la vez.
 */

const ESTADO_INICIAL: EstadoPasaporte = {
  puntos: 0,
  seguidos: [],
  seguidosAlgunaVez: [],
  escaneos: [],
  canjes: [],
  votoAtmosfera: null,
  nominaciones: [],
  actividad: [],
  noLeidas: 0,
}
const CLAVE = 'radar:pasaporte:v1'
const MAX_ACTIVIDAD = 20

/** Lee el pasaporte guardado; si no hay o está dañado, empieza de cero */
function leerGuardado(): EstadoPasaporte {
  try {
    const texto = localStorage.getItem(CLAVE)
    // Mezclamos con el estado inicial por si en el futuro agregamos campos nuevos
    return texto ? { ...ESTADO_INICIAL, ...JSON.parse(texto) } : ESTADO_INICIAL
  } catch {
    return ESTADO_INICIAL
  }
}

/** Agrega una línea al historial (y suma una notificación sin leer) */
function conActividad(e: EstadoPasaporte, texto: string, puntos?: number): EstadoPasaporte {
  const nueva = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, texto, fecha: new Date().toISOString(), puntos }
  return { ...e, actividad: [nueva, ...e.actividad].slice(0, MAX_ACTIVIDAD), noLeidas: e.noLeidas + 1 }
}

/** Normaliza un nombre para comparar: "Kallpa  Tejídos" → "kallpa tejidos" */
function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita tildes
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** Código de canje simulado, ej. "RDR-7K2Q" */
function generarCodigo(): string {
  return 'RDR-' + Math.random().toString(36).slice(2, 6).toUpperCase()
}

export default function PasaporteProvider({ children }: { children: ReactNode }) {
  const [estado, setEstado] = useState<EstadoPasaporte>(leerGuardado)
  const [aviso, setAviso] = useState<string | null>(null)
  const temporizador = useRef<number | undefined>(undefined)

  // Cada vez que cambia el estado, lo guardamos en el navegador
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(estado))
    } catch {
      // Si el navegador bloquea el guardado (modo privado), la app sigue funcionando
    }
  }, [estado])

  const avisar = useCallback((texto: string) => {
    setAviso(texto)
    window.clearTimeout(temporizador.current)
    temporizador.current = window.setTimeout(() => setAviso(null), 4000)
  }, [])

  // ---- Lecturas -----------------------------------------------------------
  const gastado = estado.canjes.reduce((total, c) => total + (obtenerRecompensa(c.recompensaId)?.puntos ?? 0), 0)
  const saldo = estado.puntos - gastado
  const estaSiguiendo = (id: string) => estado.seguidos.includes(id)
  const daPuntosSeguir = (id: string) => !estado.seguidosAlgunaVez.includes(id)
  const escaneoDe = (feriaId: string) => estado.escaneos.find((x) => x.feriaId === feriaId)
  const canjeDe = (recompensaId: string) => estado.canjes.find((c) => c.recompensaId === recompensaId)
  const escaneasteADisenador = (disenadorId: string) =>
    FERIAS.some((f) => f.disenadores.includes(disenadorId) && escaneoDe(f.id))

  // ---- Acciones -----------------------------------------------------------
  function alternarSeguir(id: string, nombre: string) {
    if (estaSiguiendo(id)) {
      setEstado((e) => ({ ...e, seguidos: e.seguidos.filter((x) => x !== id) }))
      avisar(`Dejaste de seguir a ${nombre}`)
      return
    }
    const primeraVez = daPuntosSeguir(id)
    const pts = primeraVez ? PUNTOS.seguirDisenador : 0
    setEstado((e) => {
      const nuevo = {
        ...e,
        seguidos: [...e.seguidos, id],
        seguidosAlgunaVez: primeraVez ? [...e.seguidosAlgunaVez, id] : e.seguidosAlgunaVez,
        puntos: e.puntos + pts,
      }
      return primeraVez ? conActividad(nuevo, `Empezaste a seguir a ${nombre}`, pts) : nuevo
    })
    avisar(primeraVez ? `Sigues a ${nombre} · +${pts} pts` : `Sigues a ${nombre}`)
  }

  function escanearFeria(feriaId: string): boolean {
    const feria = obtenerFeria(feriaId)
    if (!feria || escaneoDe(feriaId)) return false // no se puede escanear dos veces
    const pts = PUNTOS.escanearFeria
    setEstado((e) =>
      conActividad(
        { ...e, puntos: e.puntos + pts, escaneos: [...e.escaneos, { feriaId, fecha: new Date().toISOString() }] },
        `Escaneaste en ${feria.nombre}: sello de ${feria.distrito} y micro-documental desbloqueado`,
        pts,
      ),
    )
    avisar(`+${pts} pts · Sello de ${feria.distrito} · Micro-documental desbloqueado`)
    return true
  }

  function canjear(recompensaId: string): boolean {
    const recompensa = obtenerRecompensa(recompensaId)
    if (!recompensa || canjeDe(recompensaId) || saldo < recompensa.puntos) return false
    const codigo = generarCodigo()
    setEstado((e) =>
      conActividad(
        { ...e, canjes: [...e.canjes, { recompensaId, codigo, fecha: new Date().toISOString() }] },
        `Canjeaste: ${recompensa.nombre} (código ${codigo})`,
      ),
    )
    avisar(`¡Canjeado! ${recompensa.nombre} · código ${codigo}`)
    return true
  }

  function votar(candidataId: string, nombre: string): boolean {
    if (estado.votoAtmosfera) return false // un voto por persona
    const pts = PUNTOS.votarAtmosfera
    setEstado((e) =>
      conActividad({ ...e, votoAtmosfera: candidataId, puntos: e.puntos + pts }, `Votaste por ${nombre} como próxima atmósfera`, pts),
    )
    avisar(`Voto registrado · +${pts} pts`)
    return true
  }

  function nominar(datos: { marca: string; enlace: string; motivo: string }): ResultadoNominacion {
    const marca = datos.marca.trim()
    // No se puede nominar dos veces la misma marca
    if (estado.nominaciones.some((n) => normalizar(n.marca) === normalizar(marca))) return 'repetida'
    const conPuntos = estado.nominaciones.filter((n) => n.conPuntos).length < MAX_NOMINACIONES_CON_PUNTOS
    const pts = conPuntos ? PUNTOS.nominarMarca : 0
    const nueva = {
      id: `${Date.now()}`,
      marca,
      enlace: datos.enlace.trim(),
      motivo: datos.motivo.trim(),
      fecha: new Date().toISOString(),
      conPuntos,
    }
    setEstado((e) =>
      conActividad(
        { ...e, nominaciones: [nueva, ...e.nominaciones], puntos: e.puntos + pts },
        `Nominaste a ${marca}`,
        pts || undefined,
      ),
    )
    avisar(conPuntos ? `Nominaste a ${marca} · +${pts} pts` : `Nominaste a ${marca}`)
    return conPuntos ? 'con-puntos' : 'sin-puntos'
  }

  const marcarLeidas = useCallback(() => setEstado((e) => (e.noLeidas === 0 ? e : { ...e, noLeidas: 0 })), [])

  function reiniciar() {
    setEstado(ESTADO_INICIAL)
    avisar('Pasaporte reiniciado')
  }

  const valor: ValorPasaporte = {
    ...estado,
    saldo,
    estaSiguiendo,
    daPuntosSeguir,
    alternarSeguir,
    escaneoDe,
    escaneasteADisenador,
    escanearFeria,
    canjeDe,
    canjear,
    votar,
    nominar,
    marcarLeidas,
    reiniciar,
    avisar,
  }

  return (
    <ContextoPasaporte.Provider value={valor}>
      {children}
      {/* Aviso flotante. role="status" hace que el lector de pantalla lo lea sin interrumpir */}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4"
      >
        {aviso && (
          <p key={aviso} className="max-w-md animate-subir rounded-tarjeta bg-carbon px-5 py-3 text-center text-sm font-bold text-algodon shadow-lg">
            {aviso}
          </p>
        )}
      </div>
    </ContextoPasaporte.Provider>
  )
}

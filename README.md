# RADAR · moda peruana independiente

> *Fingir demencia no está siendo suficiente, así que decidí aprender a programar en Claude Code.*

**RADAR** es una aplicación web de curaduría de moda peruana independiente. En lugar de un feed infinito y
algorítmico, muestra prendas agrupadas por **atmósferas culturales**, cuenta la **historia de cada
diseñador** y conecta el celular con las **ferias físicas** de Lima mediante un **pasaporte digital con QR**.

**Recorrido:** 1 Descubre atmósferas → 2 Escucha la narrativa → 3 Conoce al diseñador → 4 Visita la feria y
escanea el QR → 5 Gana puntos y vuelve.

## Gratis para todos

- Para las personas usuarias **todo es gratis**: registro, feed, narrativas, pasaporte, puntos, sellos y
  recompensas. No hay botones de pago ni suscripciones.
- Las recompensas se canjean **solo con puntos**, y los puntos se ganan **sin comprar**.
- Las marcas tienen perfil, narrativa, QR y reporte **gratis**, y sus ventas **no pagan comisión**.
- Lo único de pago es la **mejora de perfil** opcional para marcas (precio en `src/config.ts`). No hay pasarela
  de pago: el botón solo abre un formulario de interés.

> Esta es una **versión de demostración**: no tiene servidor. Las personas, marcas, prendas y ferias son
> **ejemplos ficticios**, y el progreso se guarda solo en el navegador.

---

## Cómo correr el proyecto

Necesitas **Node.js 20 o más reciente** ([descargar](https://nodejs.org)). Para saber qué versión tienes,
escribe `node -v` en la terminal.

```bash
# 1. Instalar las dependencias (solo la primera vez)
npm install

# 2. Abrir el servidor de desarrollo
npm run dev
```

Abre en el navegador la dirección que aparece (normalmente `http://localhost:5173`). Cada vez que guardes un
archivo, la página se actualiza sola.

Otros comandos:

| Comando | Para qué sirve |
|---|---|
| `npm run build` | Revisa los tipos y prepara la versión final en la carpeta `dist/` |
| `npm run preview` | Muestra en el navegador la versión final ya preparada |
| `npm run lint` | Busca errores comunes en el código |

---

## Estructura de carpetas

```
public/
  favicon.svg            ← ícono de la pestaña
  img/                   ← aquí van tus fotos (ver más abajo)
src/
  main.tsx               ← punto de entrada: monta la app
  App.tsx                ← mapa de rutas (qué página va en cada dirección)
  index.css              ← colores, fuentes, cuadrícula de fondo y animaciones
  config.ts              ← puntos por acción, niveles y precio de la mejora de perfil
  navegacion.ts          ← pestañas y los 5 pasos de "así funciona"
  data/                  ← datos simulados (diseñadores, prendas, ferias…)
  hooks/                 ← el pasaporte: puntos, sellos, canjes, votos (localStorage)
  components/
    layout/              ← barra superior, menú móvil, barra de pasos, pie, notificaciones
    marca/               ← logo SVG y patrón textil andino
    ui/                  ← piezas reutilizables: modal, imagen, avatar, campos de formulario…
    narrativa/           ← reproductor, mapa de origen y trazabilidad
    prendas/ disenadores/ ferias/
  pages/                 ← una página por ruta
  utils/                 ← ayudas para fechas y niveles
```

### Rutas

| Dirección | Página |
|---|---|
| `/` | Inicio: portada, atmósferas, curaduría de hoy y diseñadores de la semana |
| `/prenda/:id` | Narrativa de una prenda (se abre como ventana sobre el feed) |
| `/disenadores` y `/disenadores/:id` | Directorio y perfil de diseñadores |
| `/ferias` | Mapa de ferias, detalle y pasaporte QR simulado |
| `/pasaporte` | Nivel, sellos, recompensas y actividad |
| `/comunidad` | Votar la próxima atmósfera y nominar marcas |
| `/marcas` | Panel para marcas (la única pantalla con precio) |
| `/como-funciona` | Diagrama, qué es gratis, cómo se sostiene y preguntas frecuentes |

---

## Cómo cambiar cosas

### Puntos, niveles y precio → `src/config.ts`

```ts
export const PUNTOS = { seguirDisenador: 5, votarAtmosfera: 10, nominarMarca: 20, escanearFeria: 50 }
export const MEJORA_PERFIL = { precioMensual: 79, moneda: 'S/', … }
```

Cambia el número, guarda y toda la app se actualiza.

### Diseñadores, prendas, ferias y recompensas → `src/data/`

Cada archivo es una lista. Para agregar una prenda, copia un bloque en `prendas.ts`, cambia el `id`
(por ejemplo `p10`) y sus textos. TypeScript te avisará si olvidas algún campo.

### Fotos → `public/img/`

Si una foto no existe, la app muestra un patrón textil con el nombre del archivo que espera. Usa estos
nombres exactos:

| Qué | Archivo |
|---|---|
| Prendas | `img/prendas/p1.jpg` … `img/prendas/p9.jpg` |
| Portada de cada diseñador | `img/disenadores/<id>-portada.jpg` (ej. `ana-flores-portada.jpg`) |
| Banner del perfil | `img/disenadores/<id>-banner.jpg` |
| Foto (opcional) | `img/disenadores/ana-flores.jpg`, `rosa-mamani.jpg`, `valeria-rios.jpg` |

Los `id` de los diseñadores son: `ana-flores`, `lucia-quispe`, `rosa-mamani`, `mateo-rojas`,
`diego-paredes` y `valeria-rios`. Recomendado: JPG de menos de 300 KB, verticales (4:5) para prendas y
horizontales para portadas y banners.

---

## El pasaporte (localStorage)

El progreso se guarda en el navegador con la clave `radar:pasaporte:v1`:

- **Puntos acumulados**: nunca bajan y definen el nivel (Curiosa 0–199, Exploradora 200–399, Curadora 400+).
- **Saldo para canjear**: acumulados menos lo ya canjeado.
- Seguidos, escaneos de ferias (uno por feria), canjes, voto, nominaciones y actividad.

Reglas para que nadie infle puntos: seguir da puntos solo la primera vez por diseñador; cada feria se escanea
una vez; se vota una sola vez; nominar da puntos por marca distinta, hasta 3.

**Para empezar de cero:** botón **Reiniciar demo** al final de `/pasaporte`.

---

## Accesibilidad y privacidad

- Pensado para **WCAG 2.1 AA**: contraste mínimo 4.5:1, foco visible, botones y enlaces reales, `alt` en
  imágenes, modales que se cierran con Esc y atrapan el foco, títulos de pestaña por página y foco en el título
  al cambiar de página. Respeta la opción del sistema "reducir movimiento".
- Revisado con [axe-core](https://github.com/dequelabs/axe-core) en todas las pantallas a 375, 768 y 1440 px:
  0 problemas.
- **Privacidad:** los escaneos se tratan según la **Ley N.º 29733** de Protección de Datos Personales. En esta
  versión nada sale del navegador.

---

## Publicar en internet

`npm run build` crea la carpeta `dist/`, que se puede subir a Netlify, Vercel o GitHub Pages.

Importante: la app usa rutas como `/ferias`. El servidor debe responder **siempre con `index.html`**; si no,
al recargar en `/ferias` aparecerá un error 404. En Netlify basta un archivo `public/_redirects` con
`/*  /index.html  200`; en Vercel, un `vercel.json` con una regla `rewrites` que envíe todo a `/index.html`.

---

## Próximos pasos (sin agregar cobros a usuarios)

- **Base de datos real** (por ejemplo Supabase) para cuentas, pasaporte compartido entre dispositivos y
  postulaciones.
- **Escaneo QR real** con la cámara del celular, con un código firmado por feria para evitar trampas.
- **Audios y micro-documentales reales** grabados por cada marca.
- **Panel de marcas** con datos reales y un flujo de curaduría para el equipo.

## Tecnología

React 19 · Vite · TypeScript · Tailwind CSS 4 · React Router 7 · Google Fonts (Playfair Display, Italiana,
Caveat, Manrope).

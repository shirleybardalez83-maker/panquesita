/// <reference types="vite/client" />

// Variables de entorno que usa RADAR al compilar
interface ImportMetaEnv {
  /** "1" cuando se compila para publicar como Artifact de claude.ai */
  readonly VITE_ARTIFACT?: string
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Siente Ticket back office, without trailing slash (e.g. https://backoffice.siente.live) */
  readonly VITE_BACKOFFICE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

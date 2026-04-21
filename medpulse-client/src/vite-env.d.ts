/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute API base (no trailing slash), e.g. https://api.example.com — omit in dev to use Vite proxy */
  readonly VITE_API_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UNSPLASH_ACCESS_KEY: string;
  readonly VITE_DEBUG_UNSPLASH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
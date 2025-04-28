/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE__TEXT_TO_IMAGE__API__SERVER__ORIGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

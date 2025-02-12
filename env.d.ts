/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEXT_TO_IMAGE_API_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

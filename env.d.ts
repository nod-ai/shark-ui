/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TEXT_TO_IMAGE_API_SERVER_ORIGIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

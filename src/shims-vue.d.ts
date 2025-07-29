declare module '*.vue' {
  import type {
    DefineComponent,
  } from '@/library/vue/exports';

  const component: DefineComponent;

  export {
    component as default,
  };
}

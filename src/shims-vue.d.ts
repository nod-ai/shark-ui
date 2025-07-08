declare module '*.vue' {
  import type {
    DefineComponent,
  } from '@/library/vue';

  const component: DefineComponent;

  export {
    component as default,
  };
}

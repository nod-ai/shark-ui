declare module '*.vue' {
  import type {
    DefineComponent,
  } from 'vue';

  const component: DefineComponent;

  export {
    component as default,
  };
}

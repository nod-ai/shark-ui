// 2025-Jul-02: This is a workaround for https://github.com/cypress-io/eslint-plugin-cypress/issues/232
declare module 'eslint-plugin-cypress' {
  import type {
    Linter,
  } from 'eslint';

  const plugin: {
    configs: {
      recommended: Linter.Config;
      [key: string]: Linter.Config | undefined;
    };
  };

  export {
    plugin as default,
  };
}

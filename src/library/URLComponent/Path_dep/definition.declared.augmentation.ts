import {
  URLComponent_Path_ParsingError,
} from './ParsingError';

import {
  URLComponent_Path_dep,
} from './definition.declared.ts';

URLComponent_Path_dep.ParsingError = URLComponent_Path_ParsingError;

declare module './definition.declared.ts' {
  namespace URLComponent_Path_dep {
    export {
      URLComponent_Path_ParsingError as ParsingError,
    };
  }
}

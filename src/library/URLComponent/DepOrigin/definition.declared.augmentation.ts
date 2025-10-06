import {
  URLComponent_Origin_ParsingError,
} from './ParsingError';

import {
  URLComponent_DepOrigin,
} from './definition.declared.ts';

URLComponent_DepOrigin.ParsingError = URLComponent_Origin_ParsingError;

declare module './definition.declared.ts' {
  namespace URLComponent_DepOrigin {
    export {
      URLComponent_Origin_ParsingError as ParsingError,
    };
  }
}

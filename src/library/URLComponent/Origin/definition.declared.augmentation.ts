import {
  URLComponent_Origin_ParsingError,
} from './ParsingError';

import {
  URLComponent_Origin,
} from './definition.declared.ts';

URLComponent_Origin.ParsingError = URLComponent_Origin_ParsingError;

declare module './definition.declared.ts' {
  namespace URLComponent_Origin {
    export {
      URLComponent_Origin_ParsingError as ParsingError,
    };
  }
}

import {
  URLComponent_Path_ParsingError,
} from './ParsingError';

import {
  URLComponent_Path,
} from './definition.ts';

URLComponent_Path.ParsingError = URLComponent_Path_ParsingError;

declare module './definition.ts' {
  namespace URLComponent_Path {
    export {
      URLComponent_Path_ParsingError as ParsingError,
    };
  }
}

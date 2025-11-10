import {
  TypeScript_File_Path,
} from './Path';

import {
  TypeScript_File,
} from './definition.declared.ts';

TypeScript_File.Path = TypeScript_File_Path;

declare module './definition.declared.ts' {
  namespace TypeScript_File {
    export {
      TypeScript_File_Path as Path,
    };
  }
}

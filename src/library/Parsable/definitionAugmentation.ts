import type {
  Parsable_String,
} from './String';

declare module './definition.ts' {
  namespace Parsable {
    export {
      type Parsable_String as String,
    };
  }
}

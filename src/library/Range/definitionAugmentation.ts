import type {
  Range_BoundContainment,
} from './BoundContainment';

declare module './definition.ts' {
  namespace Range {
    export type {
      Range_BoundContainment as BoundContainment,
    };
  }
}

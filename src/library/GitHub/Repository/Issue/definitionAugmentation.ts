import type {
  GitHub_Repository_Issue_Label,
} from './Label';

declare module './definition.ts' {
  namespace GitHub_Repository_Issue {
    export {
      type GitHub_Repository_Issue_Label as Label,
    };
  }
}

import type {
  GitHub_Repository_Issue,
} from './Issue';

declare module './definition.ts' {
  namespace GitHub_Repository {
    export {
      type GitHub_Repository_Issue as Issue,
    };
  }
}

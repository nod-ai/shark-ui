import {
  GitHub_Repository_Issue_Draftable,
} from './Draftable';

import type {
  GitHub_Repository_Issue_Label,
} from './Label';

import {
  GitHub_Repository_Issue,
} from './definition.declared.ts';

GitHub_Repository_Issue.Draftable = GitHub_Repository_Issue_Draftable;

declare module './definition.declared.ts' {
  namespace GitHub_Repository_Issue {
    export {
      type GitHub_Repository_Issue_Label/**/ as Label,
      /**/ GitHub_Repository_Issue_Draftable as Draftable,
    };
  }
}

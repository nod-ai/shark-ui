import {
  ContentDescriptor_StructuredSyntaxNameSuffix,
} from './StructuredSyntaxNameSuffix';

import {
  ContentDescriptor_TopLevel,
} from './TopLevel';

import {
  ContentDescriptor,
} from './definition.declared.ts';

ContentDescriptor.TopLevel /*             */ = ContentDescriptor_TopLevel;
ContentDescriptor.StructuredSyntaxNameSuffix = ContentDescriptor_StructuredSyntaxNameSuffix;

declare module './definition.declared.ts' {
  namespace ContentDescriptor {
    export {
      ContentDescriptor_TopLevel /*             */ as TopLevel,
      ContentDescriptor_StructuredSyntaxNameSuffix as StructuredSyntaxNameSuffix,
    };
  }
}

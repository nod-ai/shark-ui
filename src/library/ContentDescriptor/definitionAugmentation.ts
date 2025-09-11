import {
  ContentDescriptor_StructuredSyntaxNameSuffix,
} from './StructuredSyntaxNameSuffix';

import {
  ContentDescriptor_TopLevel,
} from './TopLevel';

import {
  ContentDescriptor,
} from './definition.ts';

ContentDescriptor.TopLevel /*             */ = ContentDescriptor_TopLevel;
ContentDescriptor.StructuredSyntaxNameSuffix = ContentDescriptor_StructuredSyntaxNameSuffix;

declare module './definition.ts' {
  namespace ContentDescriptor {
    export {
      ContentDescriptor_TopLevel /*             */ as TopLevel,
      ContentDescriptor_StructuredSyntaxNameSuffix as StructuredSyntaxNameSuffix,
    };
  }
}

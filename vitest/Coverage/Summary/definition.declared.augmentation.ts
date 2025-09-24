import {
  Coverage_Summary_ByFilePath,
} from './ByFilePath';

import {
  Coverage_Summary_ByLanguageConstruct,
} from './ByLanguageConstruct';

import {
  Coverage_Summary_ByMetric,
} from './ByMetric';

import {
  Coverage_Summary,
} from './definition.declared.ts';

import {
  Coverage_Summary_rootedAt,
} from './rootedAt';

Coverage_Summary.ByFilePath /*    */ = Coverage_Summary_ByFilePath;
Coverage_Summary.ByLanguageConstruct = Coverage_Summary_ByLanguageConstruct;
Coverage_Summary.ByMetric /*      */ = Coverage_Summary_ByMetric;
Coverage_Summary.rootedAt /*      */ = Coverage_Summary_rootedAt;

declare module './definition.declared.ts' {
  namespace Coverage_Summary {
    export {
      Coverage_Summary_ByFilePath /*    */ as ByFilePath,
      Coverage_Summary_ByLanguageConstruct as ByLanguageConstruct,
      Coverage_Summary_ByMetric /*      */ as ByMetric,
      Coverage_Summary_rootedAt /*      */ as rootedAt,
    };
  }
}

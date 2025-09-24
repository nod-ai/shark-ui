import {
  Schema,
} from 'effect';

import {
  Coverage_Summary_ByMetric,
} from './ByMetric';

class Coverage_Summary_ByLanguageConstruct
  extends Schema.Class<
    Coverage_Summary_ByLanguageConstruct
  >(
    'Coverage_Summary_ByLanguageConstruct',
  )({
    lines     : Coverage_Summary_ByMetric,
    functions : Coverage_Summary_ByMetric,
    statements: Coverage_Summary_ByMetric,
    branches  : Coverage_Summary_ByMetric,
  }) {}

export {
  Coverage_Summary_ByLanguageConstruct,
};

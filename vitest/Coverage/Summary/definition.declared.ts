import {
  Schema,
} from 'effect';

import {
  Coverage_Summary_ByFilePath,
} from './ByFilePath';

import {
  Coverage_Summary_ByLanguageConstruct,
} from './ByLanguageConstruct';

class Coverage_Summary
  extends Schema.Class<
    Coverage_Summary
  >(
    'Coverage_Summary',
  )({
    aggregate : Coverage_Summary_ByLanguageConstruct,
    byFilePath: Coverage_Summary_ByFilePath,
  }) {}

export {
  Coverage_Summary,
};

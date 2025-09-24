import {
  Schema,
} from 'effect';

import {
  Coverage_Summary_ByLanguageConstruct,
} from './ByLanguageConstruct';

const Coverage_Summary_ByFilePath = Schema.Record({
  key  : Schema.String,
  value: Coverage_Summary_ByLanguageConstruct,
});

type Coverage_Summary_ByFilePath = typeof Coverage_Summary_ByFilePath.Type;

export {
  Coverage_Summary_ByFilePath,
};

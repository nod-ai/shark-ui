import {
  Schema,
} from 'effect';

import {
  Coverage_Summary_ByLanguageConstruct,
} from '../ByLanguageConstruct';

const Coverage_Summary_Mixed_Schema = Schema.Record({
  key  : Schema.String,
  value: Coverage_Summary_ByLanguageConstruct,
});

export {
  Coverage_Summary_Mixed_Schema,
};

import {
  Coverage_Summary_Mixed_Schema,
} from './Schema';

import {
  Coverage_Summary_Mixed_keyForAggregate,
} from './keyForAggregate';

type Coverage_Summary_Mixed = typeof Coverage_Summary_Mixed_Schema.Type;

const Coverage_Summary_Mixed = Object.freeze({
  Schema         : Coverage_Summary_Mixed_Schema,
  keyForAggregate: Coverage_Summary_Mixed_keyForAggregate,
});

export {
  Coverage_Summary_Mixed,
};

import {
  Schema,
} from 'effect';

class Coverage_Summary_ByMetric
  extends Schema.Class<
    Coverage_Summary_ByMetric
  >(
    'Coverage_Summary_ByMetric',
  )({
    total  : Schema.Number,
    covered: Schema.Number,
    skipped: Schema.Number,
    pct    : Schema.Number,
  }) {}

export {
  Coverage_Summary_ByMetric,
};

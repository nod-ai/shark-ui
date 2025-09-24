import {
  ParseResult,
  Schema,
} from 'effect';

import {
  isUndefined,
} from 'effect/Predicate';

import {
  Coverage_Summary_Mixed,
} from './Mixed';

import {
  Coverage_Summary,
} from './definition.declared.ts';

const Coverage_Summary_FromMixed = Schema.transformOrFail(
  Coverage_Summary_Mixed.Schema,
  Coverage_Summary,
  {
    decode: (someMixedRecord, _, ast) => {
      const {
        [Coverage_Summary_Mixed.keyForAggregate]: aggregateSummary, // TODO this is missing the "branchTrue" key
        ...summaryByFile
      } = someMixedRecord;

      if (
        isUndefined(aggregateSummary)
      ) return ParseResult.fail(new ParseResult.Type(ast, aggregateSummary, 'Expected aggregate summary'));

      return ParseResult.succeed({
        aggregate : aggregateSummary,
        byFilePath: summaryByFile,
      });
    },
    encode: ($0) => ParseResult.succeed({
      [Coverage_Summary_Mixed.keyForAggregate]: $0.aggregate,
      ...$0.byFilePath,
    }),
  },
);

export {
  Coverage_Summary_FromMixed,
};

import {
  Array,
  Option,
  pipe,
} from 'effect';

import {
  isString,
} from 'effect/Predicate';

const concatenated = (
  ...givenOperands: (
    | /*         */ string
    | Option.Option<string>
  )[]
): string => pipe(
  givenOperands,
  Array.map(($0) => isString($0) ? Option.some($0) : $0),
  Array.getSomes,
  Array.join(''),
);

export {
  concatenated,
};

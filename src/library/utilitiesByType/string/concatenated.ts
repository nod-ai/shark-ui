import {
  Array,
  pipe,
} from 'effect';

const concatenated = (
  ...givenOperands: (
    | string
  )[]
): string => pipe(
  givenOperands,
  Array.map($0 => $0),
  Array.join(''),
);

export {
  concatenated,
};

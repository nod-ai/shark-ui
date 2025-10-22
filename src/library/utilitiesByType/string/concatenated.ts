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
  Array.join(''),
);

export {
  concatenated,
};

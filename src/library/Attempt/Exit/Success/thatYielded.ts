import type {
  Attempt_Exit_Success,
} from './definition.declared.ts';

const Attempt_Exit_Success_thatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Exit_Success<SomeProduct> => ({
  discriminant: 'success',
  value       : givenProduct,
});

export {
  Attempt_Exit_Success_thatYielded,
};

import type {
  Attempt_Outcome_Success,
} from './definition.declared.ts';

const Attempt_Outcome_Success_thatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Outcome_Success<SomeProduct> => ({
  discriminant: 'success',
  value       : givenProduct,
});

export {
  Attempt_Outcome_Success_thatYielded,
};

import type {
  Attempt_Outcome_Success,
} from './definition.declared.ts';

const Attempt_Outcome_Success_thatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Outcome_Success<SomeProduct> => ({
  discriminant: 'success',
  product     : givenProduct,
  isSuccess   : true,
  isFailure   : false,
  getOrElse   : () => givenProduct,
  getOrThrow  : () => givenProduct,
  value       : givenProduct,
});

export {
  Attempt_Outcome_Success_thatYielded,
};

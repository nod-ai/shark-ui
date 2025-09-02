import type {
  Contextualized,
} from '@/library/modifiersByType/error';

const Reporting_formatFor = (
  givenError: Contextualized<Error, Error>,
): string => [
  `${givenError.message}:`,
  '"""',
  givenError.cause.message,
  '"""',
].join('\n');

export {
  Reporting_formatFor,
};

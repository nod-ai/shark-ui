import {
  asString,
} from './string';

export const isError = (givenSubject: unknown): givenSubject is Error => {
  return (givenSubject instanceof Error);
};

export const asError = (givenSubject: unknown): Error => {
  if (
    isError(givenSubject)
  ) return givenSubject;

  const castedMessage = asString(givenSubject);
  return new Error(castedMessage);
};

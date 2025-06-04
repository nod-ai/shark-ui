import {
  asString,
} from './string';

const isError = (givenSubject: unknown): givenSubject is Error => {
  return (givenSubject instanceof Error);
};

const asError = (givenSubject: unknown): Error => {
  if (
    isError(givenSubject)
  ) return givenSubject;

  const castedMessage = asString(givenSubject);
  return new Error(castedMessage);
};

export {
  isError,
  asError,
};

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
  const castedError = new Error(castedMessage);
  return castedError;
};

export {
  isError,
  asError,
};

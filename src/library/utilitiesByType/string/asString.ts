import {
  isString,
} from './isString';

const asString = (givenSubject: unknown): string => {
  if (
    isString(givenSubject)
  ) return givenSubject;

  return JSON.stringify(givenSubject);
};

export {
  asString,
};

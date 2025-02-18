export const isString = (givenSubject: unknown): givenSubject is string => {
  return (typeof givenSubject === 'string');
};

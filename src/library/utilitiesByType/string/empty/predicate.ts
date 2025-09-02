const emptyString = '';

type EmptyString = typeof emptyString;

const isEmpty = (
  givenSubject: string,
): givenSubject is EmptyString => {
  return givenSubject === emptyString;
};

export {
  emptyString,
  type EmptyString,
  isEmpty,
};

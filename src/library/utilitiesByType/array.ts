const isEmpty = (givenSubject: unknown[]): givenSubject is [] => {
  return givenSubject.length === 0;
};

export {
  isEmpty,
};

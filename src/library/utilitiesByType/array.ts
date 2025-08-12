const isEmpty = (
  givenSubject: unknown[],
): givenSubject is [] => {
  return givenSubject.length === 0;
};

const hasAtLeastOne = <SomeElement>(
  givenElements: SomeElement[],
): givenElements is [SomeElement, ...SomeElement[]] => {
  return !isEmpty(givenElements);
};

export {
  isEmpty,
  hasAtLeastOne as hasAtLeastOne,
};

const isEmpty = (
  givenSubject: unknown[],
): givenSubject is [] => {
  return givenSubject.length === 0;
};

const hasAtLeastOne = <Element>(
  givenElements: Element[],
): givenElements is [Element, ...Element[]] => {
  return !isEmpty(givenElements);
};

export {
  isEmpty,
  hasAtLeastOne as hasAtLeastOne,
};

import {
  isEmpty,
} from './isEmpty';

const hasAtLeastOne = <SomeElement>(
  givenElements: SomeElement[],
): givenElements is [SomeElement, ...SomeElement[]] => {
  return !isEmpty(givenElements);
};

export {
  isEmpty,
  hasAtLeastOne,
};

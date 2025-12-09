import {
  Effect,
} from 'effect';

import {
  isEmptyArray,
  isNonEmptyArray,
} from 'effect/Array';

const soleElementIn = <SomeElement>(
  givenArray: SomeElement[],
): Effect.Effect<SomeElement, Error> => Effect.gen(function* () {
  if (
    !isNonEmptyArray(givenArray)
  ) return yield* Effect.fail(new Error('Given array was empty.'));

  const [
    firstElement,
    ...extraneousElements
  ] = givenArray;

  if (
    isEmptyArray(extraneousElements)
  ) return firstElement;

  const extraneousElementsError = new Error(`Given array had ${extraneousElements.length.toString()} extraneous elements.`);
  return yield* Effect.fail(extraneousElementsError);
});

export {
  soleElementIn,
};

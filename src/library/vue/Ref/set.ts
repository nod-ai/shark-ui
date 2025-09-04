import type {
  Ref,
} from './definition.ts';

/** Updates the wrapped instance */
const set = <SomeState>(
  givenSubject: Ref<SomeState>,
  givenValue: SomeState,
): void => {
  givenSubject.value = givenValue;
};

export {
  set,
};

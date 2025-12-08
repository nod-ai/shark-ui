import type {
  Ref,
} from './external';

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

import {
  ref,
  unref,
  type Ref,
} from 'vue';

/** Updates the wrapped instance */
const updateRef = <SomeState>(givenSubject: Ref<SomeState>, givenValue: SomeState): void => {
  givenSubject.value = givenValue;
};

export {
  ref,
  type Ref,
  unref as get,
  updateRef as set,
};

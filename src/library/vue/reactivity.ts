import {
  ref,
  unref,
  type Ref,
} from 'vue';

/** Updates the wrapped instance */
const updateRef = <Any>(givenSubject: Ref<Any>, givenValue: Any): void => {
  givenSubject.value = givenValue;
};

export {
  ref,
  type Ref,
  unref as get,
  updateRef as set,
};

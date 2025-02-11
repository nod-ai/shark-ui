import {
  ref as _ref,
  unref,
  type Ref,
} from 'vue';

/** Wraps an instance to make it reactive */
export const ref = _ref;

/** Unwraps a reactive instance */
export const get = unref;

/** Updates the wrapped instance */
export const set = <Any>(givenSubject: Ref<Any>, givenValue: Any): void => {
  givenSubject.value = givenValue;
};

import {
  ref as _ref,
  unref,
  type Ref as _Ref,
} from 'vue';

/** Wraps an instance to make it reactive */
const ref = _ref;

type Ref<
  GetterResult,
  SetterParameter = GetterResult,
> = _Ref<
  GetterResult,
  SetterParameter
>;

/** Unwraps a reactive instance */
const get = unref;

/** Updates the wrapped instance */
const updateRef = <Any>(givenSubject: Ref<Any>, givenValue: Any): void => {
  givenSubject.value = givenValue;
};

export {
  ref,
  type Ref,
  get,
  updateRef as set,
};

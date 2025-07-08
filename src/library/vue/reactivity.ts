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

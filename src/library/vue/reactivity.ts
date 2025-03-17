import {
  ref as _ref,
  unref,
  type Ref as _Ref,
} from 'vue';

/** Wraps an instance to make it reactive */
export const ref = _ref;

export type Ref<
  GetterResult,
  SetterParameter = GetterResult,
> = _Ref<
  GetterResult,
  SetterParameter
>;

/** Unwraps a reactive instance */
export const get = unref;

/** Updates the wrapped instance */
export const set = <Any>(givenSubject: Ref<Any>, givenValue: Any): void => {
  givenSubject.value = givenValue;
};

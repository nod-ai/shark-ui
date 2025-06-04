import cloneDeep from 'lodash.clonedeep';

/** Copies the value at this reference all the way down to the deepest nesting */
const cloneOf = <Any>(givenReference: Any): Any => {
  return cloneDeep(givenReference);
};

export {
  cloneOf,
};

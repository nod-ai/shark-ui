/**
 * Has the same effect as {@link Pick}, except it distributes over union types.
 *
 * Rather than mapping _kept_ keys,
 * it maps _all_ keys and then filters out the dropped ones at the end.
 */
export type Filter<
  SomeObject,
  SomeKeyToBeKept extends PropertyKey,
> = {
  [EachKey in keyof SomeObject as Extract<EachKey, SomeKeyToBeKept>]: SomeObject[EachKey]
};

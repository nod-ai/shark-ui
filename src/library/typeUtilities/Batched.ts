type Batched<
  SomeRecord extends Record<string, NonNullable<unknown>>,
> = {
  [EachKeyOfSomeRecord in keyof SomeRecord]: SomeRecord[EachKeyOfSomeRecord][];
};

export type {
  Batched,
};

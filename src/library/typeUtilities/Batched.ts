type Batched<
  SomeRecord extends object,
> = {
  [EachKeyOfSomeRecord in keyof SomeRecord]: SomeRecord[EachKeyOfSomeRecord][];
};

export type {
  Batched,
};

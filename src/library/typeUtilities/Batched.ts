type Batched<
  SomeObject extends object,
> = {
  [EachKeyOfSomeRecord in keyof SomeObject]: SomeObject[EachKeyOfSomeRecord][];
};

export type {
  Batched,
};

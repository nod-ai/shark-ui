type Batched<
  SomeObject extends object,
> = {
  [EachKeyOfSomeObject in keyof SomeObject]: SomeObject[EachKeyOfSomeObject][];
};

export type {
  Batched,
};

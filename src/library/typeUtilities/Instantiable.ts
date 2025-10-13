interface Instantiable<
  SomeClass,
> {
  [Symbol.hasInstance]: (value: unknown) => value is SomeClass;
}

export type {
  Instantiable,
};

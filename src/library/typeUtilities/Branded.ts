export type Branded<
  SomePrimitive extends string | number,
  SomeBrand extends string,
> = SomePrimitive & {
  _brand: SomeBrand;
};

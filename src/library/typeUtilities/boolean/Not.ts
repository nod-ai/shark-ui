type Not<
  SomeBoolean extends boolean,
> = SomeBoolean extends true
  ? false
  : true;

export type {
  Not,
};

type If<
  SomeCondition extends boolean,
  SomeExpressionWhenTrue,
  SomeExpressionWhenFalse,
> =
  SomeCondition extends true
    ? SomeExpressionWhenTrue
    : SomeExpressionWhenFalse
;

export type {
  If,
};

type Is<
  SomeLeftHandOperand,
  SomeRightHandOperand,
> =
  SomeLeftHandOperand extends SomeRightHandOperand
    ? SomeRightHandOperand extends SomeLeftHandOperand
      ? true
      : false
    : false
;

type If<
  SomeCondition extends boolean,
  SomeExpressionWhenTrue,
  SomeExpressionWhenFalse,
> =
  SomeCondition extends true
    ? SomeExpressionWhenTrue
    : SomeExpressionWhenFalse
;

type Not<
  SomeBoolean extends boolean,
> = SomeBoolean extends true
  ? false
  : true;

export type {
  Is,
  If,
  Not,
};

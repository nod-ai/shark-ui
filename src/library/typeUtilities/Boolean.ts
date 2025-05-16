export type Is<
  LeftHandOperand,
  RightHandOperand,
> =
  LeftHandOperand extends RightHandOperand
    ? RightHandOperand extends LeftHandOperand
      ? true :
      false :
    false;

export type If<
  Condition extends boolean,
  WhenTrue,
  WhenFalse,
> =
  Condition extends true
    ? WhenTrue
    : WhenFalse;

export type Not<
  SomeBoolean extends boolean,
> = SomeBoolean extends true
  ? false
  : true;

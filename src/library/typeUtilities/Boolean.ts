type Is<
  LeftHandOperand,
  RightHandOperand,
> =
  LeftHandOperand extends RightHandOperand
    ? RightHandOperand extends LeftHandOperand
      ? true :
      false :
    false;

type If<
  Condition extends boolean,
  WhenTrue,
  WhenFalse,
> =
  Condition extends true
    ? WhenTrue
    : WhenFalse;

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

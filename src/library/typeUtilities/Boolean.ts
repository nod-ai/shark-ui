export type Is<
  LeftHandOperand,
  RightHandOperand,
> =
  LeftHandOperand extends RightHandOperand
    ? RightHandOperand extends LeftHandOperand
      ? true :
      false :
    false;

export type Not<
  SomeBoolean extends boolean,
> = SomeBoolean extends true
  ? false
  : true;

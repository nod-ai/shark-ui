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

export type {
  Is,
};

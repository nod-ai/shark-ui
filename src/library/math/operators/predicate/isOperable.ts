/** Whether the given operand can be mathematically operated upon in a useful way. */
const isOperable = (
  givenOperand: number,
): boolean => {
  return !Number.isNaN(givenOperand);
};

export {
  isOperable,
};

const concatenated = (
  ...givenOperands: string[]
): string => {
  return givenOperands
    .join('');
};

export {
  concatenated,
};

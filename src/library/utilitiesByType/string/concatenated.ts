const concatenated = (
  ...givenOperands: (string | null)[]
): string => {
  const joinableOperands = givenOperands.map($0 => $0 ?? '');
  const joinedOperands = joinableOperands.join('');
  return joinedOperands;
};

export {
  concatenated,
};

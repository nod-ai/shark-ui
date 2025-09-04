import type {
  StringLike,
} from './StringLike';

const concatenated = (
  ...givenOperands: (StringLike | null)[]
): string => {
  const joinableOperands = givenOperands.map($0 => $0?.toString() ?? '');
  const joinedOperands = joinableOperands.join('');
  return joinedOperands;
};

export {
  concatenated,
};

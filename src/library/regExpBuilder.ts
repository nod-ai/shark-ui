export const buildRegExp = (...givenPatterns: string[]): RegExp => {
  return new RegExp(
    givenPatterns.join(''),
  );
};

export const group = (givenPattern: string): string => {
  const nonCapturing = '?:';
  return '(' + nonCapturing + givenPattern + ')';
};

export const zeroOrMore = (givenPattern: string): string => {
  return group(givenPattern) + '*';
};

export const oneOrMore = (givenPattern: string): string => {
  return group(givenPattern) + '+';
};

export const optional = (givenPattern: string): string => {
  return group(givenPattern) + '?';
};

export const choiceOf = (...givenPatterns: string[]): string => {
  return group(givenPatterns.join('|'));
};

export const repeat = (givenPattern: string, givenCount: number): string => {
  return group(givenPattern) + '{' + givenCount.toString() + '}';
};

export const anyOf = (givenCharacters: string): string => {
  return '[' + givenCharacters + ']';
};

export const characterRange = (givenStart: string, givenEnd: string): string => {
  return [
    givenStart,
    givenEnd,
  ].join('-');
};

export const characterClass = (...givenPatterns: string[]): string => {
  return anyOf(givenPatterns.join(''));
};

export const digit = '\\d';

export const startOfString = '^';
export const endOfString = '$';

const isError = (
  givenSubject: unknown,
): givenSubject is Error => {
  return (givenSubject instanceof Error);
};

export {
  isError,
};

const sanctioned = <
  TryBlockOutput,
  CatchBlockOutput,
>(
  {
    try: getTryBlockOutput,
    catch: getCatchBlockOutputFor,
  }: {
    try: () => TryBlockOutput;
    catch: ($0: unknown) => CatchBlockOutput;
  },
): TryBlockOutput | CatchBlockOutput => {
  // eslint-disable-next-line no-restricted-syntax -- this is the implementation designed to help avoid use of raw try/catch
  try {
    return getTryBlockOutput();
  }
  catch (whateverThatWasThrown) {
    return getCatchBlockOutputFor(whateverThatWasThrown);
  }
};

const sanctionedAsync = async <
  TryBlockOutput,
  CatchBlockOutput,
>(
  {
    try: retrieveTryBlockOutput,
    catch: getCatchBlockOutputFor,
  }: {
    try: () => Promise<TryBlockOutput>;
    catch: ($0: unknown) => CatchBlockOutput;
  },
): Promise<TryBlockOutput | CatchBlockOutput> => {
  // eslint-disable-next-line no-restricted-syntax -- this is the implementation designed to help avoid use of raw try/catch
  try {
    return await retrieveTryBlockOutput();
  }
  catch (whateverThatWasThrown) {
    return getCatchBlockOutputFor(whateverThatWasThrown);
  }
};

export {
  sanctioned,
  sanctionedAsync,
};

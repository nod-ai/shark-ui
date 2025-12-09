const shallowlyMerged = <
  SomeRecord extends Record<string, unknown>,
>(
  ...givenRecords: SomeRecord[]
): SomeRecord => {
  return givenRecords.reduce<SomeRecord>((runningRecords, eachRecord) => {
    return {
      ...runningRecords,
      ...eachRecord,
    };
  }, {} as SomeRecord);
};

export {
  shallowlyMerged,
};

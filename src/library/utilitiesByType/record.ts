export const shallowlyMerged = <
  SomeRecord extends Record<string, unknown>,
  SomeNullableRecord = SomeRecord | null,
>(
  ...givenRecords: [SomeNullableRecord, ...SomeNullableRecord[]]
): SomeRecord => {
  return givenRecords.reduce<SomeRecord>((runningRecords, eachRecord) => {
    return {
      ...runningRecords,
      ...eachRecord,
    };
  }, {} as SomeRecord);
};

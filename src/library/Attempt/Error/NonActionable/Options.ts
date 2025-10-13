interface Attempt_Error_NonActionable_Options
  extends ErrorOptions {
  /** A function that's acting as an alternative to raw `throw` */
  thrower?: (
    ...parameters: any[] // eslint-disable-line @typescript-eslint/no-explicit-any -- aligns with 2nd input of `Error.captureStackTrace`
  ) => unknown;
}

export type {
  Attempt_Error_NonActionable_Options,
};

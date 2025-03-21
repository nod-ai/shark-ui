/**
 * When an open-ended `string` is too permissive, extend this class and provide a means to instantiate some subset
 */
export default abstract class StringSubset<Brand extends string> extends String {
  /**
   * Makes subclasses structurally different from each other.
   * This allows the type-checker to discern between them and complain about mismatched types.
   */
  private readonly brand!: Brand;

  protected constructor(givenInstance: string) {
    super(givenInstance);
  }
};

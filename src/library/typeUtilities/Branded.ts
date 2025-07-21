/**
 * Creates a type-safe way to distinguish between different subclasses of a base class.
 *
 * When implemented by a class, makes subclasses structurally different from each other such that
 * the type-checker will complain if you try to assign a subclass to a variable of a different subclass.
 */
interface Branded<
  SomeBrand extends string,
> {
  /**
   * Allows the type-checker to discern between subclasses and complain about mismatched types.
   */
  readonly brand: SomeBrand;
}

export type {
  Branded,
};

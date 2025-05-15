import type {
  Branded,
} from '@/library/typeUtilities/Branded';

/** Extend this class to describe errors from which callers ought to recover */
abstract class ActionableError<SomeBrand extends string>
  extends Error
  implements Branded<SomeBrand> {
  public readonly brand!: SomeBrand;
}

export default ActionableError;

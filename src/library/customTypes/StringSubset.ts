import type {
  Branded,
} from '@/library/typeUtilities/Branded';

/**
 * When an open-ended `string` is too permissive, extend this class and provide a means to instantiate some subset
 */
abstract class StringSubset<SomeBrand extends string>
  extends String
  implements Branded<SomeBrand> {
  public readonly brand!: SomeBrand;
}

export default StringSubset;

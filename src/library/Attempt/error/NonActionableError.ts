import type {
  Branded,
} from '@/library/typeUtilities/Branded';

/**
 * Errors from which normal execution cannot be recovered.
 *
 * Applies to errors that the developer neglected to prevent, or that are
 * impossible to handle.
 */
class NonActionableError
  extends Error
  implements Branded<'NonActionableError'> {
  public readonly brand!: 'NonActionableError';

  public constructor(
    givenMessage: NonActionableError['message'],
    givenOptions?: ErrorOptions,
  ) {
    super(givenMessage, givenOptions);
    this.name = 'NonActionableError';
  }
}

export default NonActionableError;

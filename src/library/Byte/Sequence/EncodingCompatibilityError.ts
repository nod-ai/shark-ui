import Attempt from '@/library/Attempt';

import {
  Byte_cofactorTo,
} from '../utilities/cofactorTo';

class Byte_Sequence_EncodingCompatibilityError
  extends Attempt.ActionableError<
  'Byte_Sequence_EncodingCompatibilityError'
> {
  public override name = 'Byte_Sequence_CompatibilityError' as const;

  public constructor(
    givenBitWidth: number,
  ) {
    const byteCofactor = Byte_cofactorTo(givenBitWidth);
    super(`Character count for ${givenBitWidth.toString()}-bit sequence must be a multiple of ${byteCofactor.toString()} to be byte encodable`);
  }
}

export {
  Byte_Sequence_EncodingCompatibilityError as default,
};

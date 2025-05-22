import Attempt from '@/library/Attempt';

import {
  cofactorTo as Byte_cofactorTo,
} from '..';

class Byte_Sequence_EncodingCompatibilityError extends Attempt.ActionableError<'Byte_Sequence_EncodingCompatibilityError'> {
  public constructor(givenBitWidth: number) {
    const byteCofactor = Byte_cofactorTo(givenBitWidth);
    super(`Character count for ${givenBitWidth.toString()}-bit sequence must be a multiple of ${byteCofactor.toString()} to be byte encodable`);
    this.name = 'Byte_Sequence_CompatibilityError';
  }
}

export {
  Byte_Sequence_EncodingCompatibilityError as default,
};

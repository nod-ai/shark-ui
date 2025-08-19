import Attempt from '@/library/Attempt';
import Byte from '@/library/Byte';

class Sequence_Byte_EncodingCompatibilityError
  extends Attempt.ActionableError<
  'Sequence_Byte_EncodingCompatibilityError'
> {
  public override name = 'Sequence_Byte_CompatibilityError' as const;

  public constructor(
    givenBitWidth: number,
  ) {
    const byteCofactor = Byte.cofactorTo(givenBitWidth);
    super(`Character count for ${givenBitWidth.toString()}-bit sequence must be a multiple of ${byteCofactor.toString()} to be byte encodable`);
  }
}

export {
  Sequence_Byte_EncodingCompatibilityError as default,
};

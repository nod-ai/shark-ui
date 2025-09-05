import Attempt from '@/library/Attempt';
import Byte from '@/library/Byte';

class Sequence_Byte_Encoded_Compatibility_Error
  extends Attempt.Error_Actionable<
    'Sequence_Byte_Encoded_Compatibility_Error'
  > {
  public override name = 'Sequence_Byte_Encoded_Compatibility_Error' as const;

  public constructor(
    givenBitWidth: number,
  ) {
    const byteCofactor = Byte.cofactorTo(givenBitWidth);
    super(`Character count for ${givenBitWidth.toString()}-bit sequence must be a multiple of ${byteCofactor.toString()} to be byte encodable`);
  }
}

export {
  Sequence_Byte_Encoded_Compatibility_Error as _default,
};

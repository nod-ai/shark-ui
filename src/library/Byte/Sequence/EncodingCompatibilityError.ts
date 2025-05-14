import * as Byte from '@/library/Byte';

class Byte_Sequence_EncodingCompatibilityError extends Error {
  public constructor(givenBitWidth: number) {
    const byteCofactor = Byte.cofactorTo(givenBitWidth);
    super(`Character count for ${givenBitWidth.toString()}-bit sequence must be a multiple of ${byteCofactor.toString()} to be byte encodable`);
    this.name = 'Byte_Sequence_CompatibilityError';
  }
}

export default Byte_Sequence_EncodingCompatibilityError;

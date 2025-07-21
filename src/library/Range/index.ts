import Attempt from '@/library/Attempt';

import {
  arithmeticMeanOf,
} from '@/library/math';

type RangeBound = 'exclusive' | 'inclusive';

class Range {
  protected constructor(
    public readonly lowerBound: number,
    public readonly upperBound: number,
  ) {}

  public static spanning(
    {
      from: givenLowerBound,
      to: givenUpperBound,
    }: {
      from: Range['lowerBound'];
      to: Range['upperBound'];
    },
  ): Range {
    if (
      givenUpperBound < givenLowerBound
    ) return Attempt.abandon('Upper bound must not be lower than lower bound');

    const validRange = new this(
      givenLowerBound,
      givenUpperBound,
    );

    return validRange;
  }

  public get width(): number {
    return this.upperBound - this.lowerBound;
  }

  public get midpoint(): number {
    return arithmeticMeanOf(
      this.lowerBound,
      this.upperBound,
    );
  }

  public exclusivelyContains(givenValue: number): boolean {
    return (this.lowerBound < givenValue) && (givenValue < this.upperBound);
  }

  public contains(
    givenValue: number,
    {
      lower: givenLower,
      upper: givenUpper,
    }: {
      lower: RangeBound;
      upper: RangeBound;
    },
  ): boolean {
    return this.exclusivelyContains(givenValue)
      || ((givenLower === 'inclusive') && (givenValue === this.lowerBound))
      || ((givenUpper === 'inclusive') && (givenValue === this.upperBound));
  }

  public inclusivelyContains(givenValue: number): boolean {
    return this.contains(
      givenValue,
      {
        lower: 'inclusive',
        upper: 'inclusive',
      },
    );
  }

  public get inInclusiveNotation(): string {
    return `[${this.lowerBound.toString()}, ${this.upperBound.toString()}]`;
  }
}

export {
  Range as default,
};

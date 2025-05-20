import Attempt from '@/library/Attempt';

import {
  arithmeticMeanOf,
} from '@/library/math/aggregators.ts';

type RangeBound = 'exclusive' | 'inclusive';

export default class Range {
  public constructor(
    public readonly lowerBound: number,
    public readonly upperBound: number,
  ) {
    if (
      upperBound < lowerBound
    ) return Attempt.abandon('Upper bound must not be lower than lower bound');

    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  }

  public static spanning(
    {
      from: givenLowerBound,
      to: givenUpperBound,
    }: {
      from: Range['lowerBound'];
      to: Range['upperBound'];
    },
  ): Range {
    return new this(
      givenLowerBound,
      givenUpperBound,
    );
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

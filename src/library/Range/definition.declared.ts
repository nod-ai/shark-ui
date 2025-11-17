import {
  Effect,
} from 'effect';

import {
  arithmeticMeanOf,
} from '@/library/math';

import type {
  Range_BoundContainment,
} from './BoundContainment';

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
  ): Effect.Effect<Range, Error> {
    return Effect.gen(this, function* () {
      if (
        givenUpperBound < givenLowerBound
      ) return yield* Effect.fail(new Error('Upper bound must not be lower than lower bound'));

      const validRange = new this(
        givenLowerBound,
        givenUpperBound,
      );

      return validRange;
    });
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
      lower: Range_BoundContainment;
      upper: Range_BoundContainment;
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
    const bracedBounds = `[${this.lowerBound.toString()}, ${this.upperBound.toString()}]`;
    return bracedBounds;
  }
}

export {
  Range,
};

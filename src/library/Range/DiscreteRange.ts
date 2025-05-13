import {
  NonActionableError,
} from '@/library/Attempt';

import Range from './index.ts';

export default class DiscreteRange extends Range implements Iterable<number> {
  public constructor(
    lowerBound: Range['lowerBound'],
    upperBound: Range['upperBound'],
    public readonly stepSize: number,
  ) {
    super(
      lowerBound,
      upperBound,
    );

    if (
      stepSize < 0
    ) throw new NonActionableError('Step size must be positive');

    const overstep = this.width % stepSize;

    if (
      overstep !== 0
    ) throw new NonActionableError('Step size must fit evenly into the range');

    this.stepSize = stepSize;
  }

  public static override spanning(
    {
      from: givenLowerBound,
      to: givenUpperBound,
      by: givenStepSize,
    }: {
      from: DiscreteRange['lowerBound'];
      to: DiscreteRange['upperBound'];
      by: DiscreteRange['stepSize'];
    },
  ): DiscreteRange {
    return new this(
      givenLowerBound,
      givenUpperBound,
      givenStepSize,
    );
  }

  public override exclusivelyContains(givenValue: number): boolean {
    const overstep = (givenValue - this.lowerBound) % this.stepSize;

    return (overstep === 0) && super.exclusivelyContains(givenValue);
  }

  public [Symbol.iterator](): Iterator<number> {
    let eachValue = this.lowerBound;

    const proceedWithBoundsExcluded = (): IteratorResult<number> => {
      eachValue = eachValue + this.stepSize;

      if (
        this.upperBound < eachValue
      ) throw new NonActionableError(`Unexpected overstep when iterating over ${this.inInclusiveNotation} with step size ${this.stepSize.toString()}`);

      if (this.upperBound === eachValue) {
        return {
          done : true,
          value: undefined,
        };
      }

      return {
        done : false,
        value: eachValue,
      };
    };

    return {
      next: proceedWithBoundsExcluded,
    };
  }

  public get exclusiveValues(): number[] {
    return Array.from(this);
  }

  public get inclusiveValues(): number[] {
    return [
      this.lowerBound,
      ...this.exclusiveValues,
      this.upperBound,
    ];
  }
}

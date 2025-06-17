import Attempt from '@/library/Attempt';

import Range from './index.ts';

class DiscreteRange extends Range implements Iterable<number> {
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
    ) return Attempt.abandon('Step size must be positive');

    const overstep = this.width % stepSize;

    if (
      overstep !== 0
    ) return Attempt.abandon('Step size must fit evenly into the range');

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

  private* generateExclusiveSteps() {
    let eachExclusiveStep = this.lowerBound + this.stepSize;

    while (eachExclusiveStep < this.upperBound) {
      yield eachExclusiveStep;
      eachExclusiveStep += this.stepSize;
    }
  }

  public [Symbol.iterator](): Iterator<number> {
    return this.generateExclusiveSteps();
  }

  public get exclusiveSteps(): number[] {
    return Array.from(this);
  }

  public get inclusiveSteps(): number[] {
    return [
      this.lowerBound,
      ...this.exclusiveSteps,
      this.upperBound,
    ];
  }
}

export {
  DiscreteRange as default,
};

import Attempt from '@/library/Attempt';

import {
  isNegative,
} from '@/library/math';

import {
  default as Range,
} from './definition.ts';

class DiscreteRange
  extends Range {
  protected constructor(
    lowerBound: Range['lowerBound'],
    upperBound: Range['upperBound'],
    public readonly stepSize: number,
  ) {
    super(
      lowerBound,
      upperBound,
    );
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
    const validRange = super.spanning({
      from: givenLowerBound,
      to  : givenUpperBound,
    });

    if (
      isNegative(givenStepSize)
    ) return Attempt.abandon('Step size must be non-negative');

    const overstep = validRange.width % givenStepSize;

    if (
      overstep !== 0
    ) return Attempt.abandon('Step size must fit evenly into the range');

    const validDiscreteRange = new this(
      validRange.lowerBound,
      validRange.upperBound,
      givenStepSize,
    );

    return validDiscreteRange;
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

  private* generateInclusiveSteps() {
    yield this.lowerBound;

    if (
      this.lowerBound === this.upperBound
    ) return;

    yield* this.generateExclusiveSteps();
    yield this.upperBound;
  }

  public get exclusiveSteps(): number[] {
    const generatedSteps = this.generateExclusiveSteps();
    return Array.from(generatedSteps);
  }

  public get inclusiveSteps(): number[] {
    const generatedSteps = this.generateInclusiveSteps();
    return Array.from(generatedSteps);
  }
}

export {
  DiscreteRange as default,
};

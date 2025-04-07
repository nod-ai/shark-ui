import Range from './index.ts';

export default class DiscreteRange extends Range {
  public constructor(
    lowerBound: Range['lowerBound'],
    upperBound: Range['upperBound'],
    public readonly stepSize: number,
  ) {
    super(
      lowerBound,
      upperBound,
    );

    if (stepSize < 0) throw new Error('Step size must be positive');

    const overstep = this.width % stepSize;

    if (overstep !== 0) throw new Error('Step size must fit evenly into the range');

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
}

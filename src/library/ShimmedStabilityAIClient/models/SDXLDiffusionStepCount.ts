import DiscreteRange from '@/library/Range/DiscreteRange.ts';

/**
 * Sourced from the [StabilityAI OpenAPI spec](https://github.com/nod-ai/StabilityAI-client-typescript/blob/HEAD/openapi.json)
 *
 * Defined at "components.schemas.Steps"
 */
export default abstract class SDXLDiffusionStepCount { // eslint-disable-line @typescript-eslint/no-extraneous-class
  public static range = DiscreteRange.spanning({
    from: 10,
    to  : 50,
    by  : 1,
  });
};

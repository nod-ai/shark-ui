import {
  Effect,
} from 'effect';

import Range from '@/library/Range';

/**
 * Sourced from the [StabilityAI OpenAPI spec](https://github.com/nod-ai/StabilityAI-client-typescript/blob/HEAD/openapi.json)
 *
 * Defined at "components.schemas.Steps"
 */
abstract class SDXL_DiffusionStepCount { // eslint-disable-line @typescript-eslint/no-extraneous-class
  public static range = Range.Discrete.spanning({
    from: 10,
    to  : 50,
    by  : 1,
  }).pipe(Effect.runSync);
}

export {
  SDXL_DiffusionStepCount,
};

import type {
  Batched,
} from '@/library/typeUtilities';

import type {
  Shortfin_TextToImage_SDXL_Client_Request_Body,
} from './definition.ts';

class Shortfin_TextToImage_SDXL_Client_Request_Body_Batched
implements Batched<
  Shortfin_TextToImage_SDXL_Client_Request_Body
> {
  public constructor(
    /** @inheritdoc Number of elements defines the size of the batch. */
    public prompt/*    */: string[] = [],
    /** @inheritdoc Number of elements must match the size of the batch. */
    public neg_prompt/**/: string[] = [],
    /** @inheritdoc Number of elements must match the size of the batch. */
    public height/*    */: number[] = [],
    /** @inheritdoc Number of elements must match the size of the batch. */
    public width/*     */: number[] = [],
    /** @inheritdoc Number of elements must match the size of the batch. */
    public steps/*     */: number[] = [],
    /** @inheritdoc Number of elements must match the size of the batch. */
    public guidance_scale: number[] = [],
    /** @inheritdoc Number of elements must match the size of the batch. */
    public seed/*      */: number[] = [],
  ) {}
}

export {
  Shortfin_TextToImage_SDXL_Client_Request_Body_Batched,
};

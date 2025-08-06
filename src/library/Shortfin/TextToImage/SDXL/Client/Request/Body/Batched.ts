type UnsignedInteger = number;
type FloatingPoint = number;

interface Shortfin_TextToImage_SDXL_Client_Request_Body_Batched {
  /** The text that will be fed to the model. */
  prompt/*    */: string[];
  /** The text that will be fed to the model with an equal but opposite weight. */
  neg_prompt/**/: string[];
  /**
   * The vertical dimension of the output image.
   */
  height/*    */: UnsignedInteger[];
  /**
   * The horizontal dimension of the output image.
   */
  width/*     */: UnsignedInteger[];
  /**
   * The number of diffusion slices upon which model inference is performed.
   */
  steps/*     */: UnsignedInteger[];
  /**
   * Configures the pipeline's classifier-free guidance scale for de-noising.
   */
  guidance_scale: FloatingPoint[];
  /**
   * The seed for random latents generation.
   */
  seed/*      */: UnsignedInteger[];
}

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Body_Batched,
};

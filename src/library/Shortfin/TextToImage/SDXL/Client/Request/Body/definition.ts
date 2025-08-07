interface Shortfin_TextToImage_SDXL_Client_Request_Body {
  /** The text that will be fed to the model. */
  prompt/*    */: string;
  /** The text that will be fed to the model with an equal but opposite weight. */
  neg_prompt/**/: string;
  /**
   * The vertical dimension of the output image.
   *
   * Must be an integer.
   */
  height/*    */: number;
  /**
   * The horizontal dimension of the output image.
   *
   * Must be an integer.
   */
  width/*     */: number;
  /**
   * The number of diffusion slices upon which model inference is performed.
   *
   * Must be an integer in the range 1 <= n <= 100.
   */
  steps/*     */: number;
  /**
   * Configures the pipeline's classifier-free guidance scale for de-noising.
   *
   * Must be in the range 0 <= x <= 10.
   */
  guidance_scale: number;
  /**
   * The seed for random latents generation.
   *
   * Must be a positive integer.
   */
  seed/*      */: number;
}

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Body,
};

type UnsignedInteger = number;
type FloatingPoint = number;

interface Shortfin_TextToImage_SDXL_Client_Request_Body_Batched {
  prompt/*    */: string[];
  neg_prompt/**/: string[];
  height/*    */: UnsignedInteger[];
  width/*     */: UnsignedInteger[];
  steps/*     */: UnsignedInteger[];
  guidance_scale: FloatingPoint[];
  seed/*      */: UnsignedInteger[];
}

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Body_Batched,
};

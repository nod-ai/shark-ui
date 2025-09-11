import type {
  ShimmedStabilityAIClient_Version1_Image,
} from './Image';

declare module './definition.ts' {
  namespace ShimmedStabilityAIClient_Version1 {
    export {
      type ShimmedStabilityAIClient_Version1_Image as Image,
    };
  }
}

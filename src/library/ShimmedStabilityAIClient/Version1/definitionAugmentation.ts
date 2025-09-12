import type {
  ShimmedStabilityAIClient_Version1_Image,
} from './Image';

declare module './definition.declared.ts' {
  namespace ShimmedStabilityAIClient_Version1 {
    export {
      type ShimmedStabilityAIClient_Version1_Image as Image,
    };
  }
}

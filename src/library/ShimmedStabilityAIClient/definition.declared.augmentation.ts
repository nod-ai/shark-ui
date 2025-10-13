import type {
  ShimmedStabilityAIClient_Version1,
} from './Version1';

declare module './definition.declared.ts' {
  namespace ShimmedStabilityAIClient {
    export {
      type ShimmedStabilityAIClient_Version1 as Version1,
    };
  }
}

<script setup lang="ts">
import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';
import {
  useStatefulProcess,
} from '@/library/vue/statefulProcess.ts';

import type {
  TextToImageRequestBody,
} from 'stabilityai-client-typescript/models/components';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient/index.ts';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

import placeholderImage from '@/assets/stable-diffusion-image-output-placeholder.png';
import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

import ImageGenerationPromptWeight, {
  quantitative,
} from '@/models/ImageGenerationPromptWeight.ts';

const defaultPrompt: ImageGenerationPrompt = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const promptEntry: Ref<ImageGenerationPrompt> = ref(cloneOf(defaultPrompt));

const generatedImage: Ref<ImageURI | null> = ref(null);

const toTextPrompts = (
  givenPrompt: ImageGenerationPrompt,
  givenWeightQuality: 'positive' | 'negative',
): TextToImageRequestBody['textPrompts'] => {
  const derivedWeight = ImageGenerationPromptWeight[givenWeightQuality];

  return givenPrompt[givenWeightQuality]
    .split(',')
    .map($0 => ({
      text  : $0.trim(),
      weight: quantitative(derivedWeight),
    }));
};

const shimmedStabilityAIClient = new ShimmedStabilityAIClient({
  serverURL: import.meta.env.VITE_TEXT_TO_IMAGE_API_ORIGIN,
});

const imageGeneration = useStatefulProcess(async () => {
  const proposedPrompt = get(promptEntry);

  const textToImageResponse = await shimmedStabilityAIClient.version1.image.tryToGenerateFromText({
    engineId              : 'stable-diffusion-xl-1024-v1-0',
    textToImageRequestBody: {
      textPrompts: [
        ...toTextPrompts(proposedPrompt, 'positive'),
        ...toTextPrompts(proposedPrompt, 'negative'),
      ],
      height  : 1024,
      width   : 1024,
      steps   : 20,
      cfgScale: 7.5,
      seed    : 0,
    },
  });

  if (
    !('artifacts' in textToImageResponse.result)
  ) throw new Error('Expected response rather than readable stream');

  const generatedArtifacts = textToImageResponse.result.artifacts;

  if (
    generatedArtifacts === undefined
  ) throw new Error('Expected artifacts in response result');

  const [soleGeneratedArtifact] = generatedArtifacts;

  if (
    soleGeneratedArtifact === undefined
  ) throw new Error('Expected at least one artifact in response');

  if (
    soleGeneratedArtifact.base64 === undefined
  ) throw new Error('Expected image data from sole artifact');

  const base64DataOfNewImage = Base64CharacterEncodedByteSequence.tryToParseFrom(soleGeneratedArtifact.base64);
  const newImage = new ImageURI('png', 'base64', base64DataOfNewImage);
  set(generatedImage, newImage);
});
</script>

<template>
  <section
    class="text-to-image-view"
  >
    <div class="input-section">
      <label
        for="prompt_positive"
      >
        Prompt
      </label>
      <textarea
        id="prompt_positive"
        v-model="promptEntry.positive"
        placeholder="Enter prompt here"
        rows="5"
      />

      <br>

      <label
        for="prompt_negative"
      >
        Negative prompt
      </label>
      <textarea
        id="prompt_negative"
        v-model="promptEntry.negative"
        placeholder="Enter negative prompt here"
        rows="5"
      />

      <br>

      <button
        @click="imageGeneration.try"
        :disabled="imageGeneration.isInProgress"
      >
        {{
          imageGeneration.isInProgress
            ? 'Generating Image...'
            : 'Generate Image'
        }}
      </button>
    </div>

    <br>

    <img
      :src="generatedImage?.toString() ?? placeholderImage"
      alt="presented image"
      class="presented-image"
      :class="{
        'placeholder-image': (generatedImage === null),
      }"
    >
  </section>
</template>

<style scoped>
.text-to-image-view {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  >.input-section {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  >.presented-image {
    height: 100%;
    width: 100%;
  }

  >.placeholder-image {
    filter: grayscale(1);
    opacity: 0.5;
  }
}
</style>

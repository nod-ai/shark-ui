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

import * as StabilityAIClient from 'stabilityai-client-typescript/models/components';

import * as InferenceClient from '@/library/InferenceClient/index.ts';

import type ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference';

import exampleOutputImage from '@/assets/stable-diffusion-example-output-image.png';
import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';
import ImageGenerationPromptWeight, {
  quantitative,
} from '@/models/ImageGenerationPromptWeight.ts';

const newPrompt: ImageGenerationPrompt = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const promptEntry = ref(cloneOf(newPrompt));

const presentableImage: Ref<ImageURI | null> = ref(null);

const promptDelimiter = ',';

const toTextPrompts = (
  givenPrompt: ImageGenerationPrompt,
  givenWeightQuality: 'positive' | 'negative',
): StabilityAIClient.TextToImageRequestBody['textPrompts'] => {
  return givenPrompt[givenWeightQuality]
    .split(promptDelimiter)
    .map($0 => ({
      text  : $0.trim(),
      weight: quantitative(ImageGenerationPromptWeight[givenWeightQuality]),
    }));
};

const toStabilityAITextPrompts = (
  givenPrompt: ImageGenerationPrompt,
): StabilityAIClient.TextToImageRequestBody['textPrompts'] => {
  const positivePrompts = toTextPrompts(givenPrompt, 'positive');
  const negativePrompts = toTextPrompts(givenPrompt, 'negative');

  return [
    ...positivePrompts,
    ...negativePrompts,
  ];
};

const imageGeneration = useStatefulProcess(async () => {
  const proposedPrompt = get(promptEntry);

  const newImage = await InferenceClient.tryToGenerateImage({
    textPrompts: toStabilityAITextPrompts(proposedPrompt),
    height     : 1024,
    width      : 1024,
    steps      : 20,
    cfgScale   : 7.5,
    seed       : 0,
  });

  set(presentableImage, newImage);
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
      :src="presentableImage?.toString() ?? exampleOutputImage"
      alt="presented image"
      class="presented-image"
      :class="{
        'placeholder-image': (presentableImage === null),
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

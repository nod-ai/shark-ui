<script setup lang="ts">
import {
  get,
  ref,
  type Ref,
} from '@/library/vue/reactivity.ts';
import {
  useStatefulProcess,
} from '@/library/vue/statefulProcess.ts';

import {
  VBtn,
} from 'vuetify/components/VBtn';
import {
  VForm,
} from 'vuetify/components/VForm';
import {
  VContainer,
} from 'vuetify/components/VGrid';
import {
  VImg,
} from 'vuetify/components/VImg';
import {
  VMain,
} from 'vuetify/components/VMain';
import {
  VSkeletonLoader,
} from 'vuetify/components/VSkeletonLoader';

import ShimmedStabilityAIClient from '@/library/ShimmedStabilityAIClient/index.ts';
import SDXLDiffusionStepCount from '@/library/ShimmedStabilityAIClient/models/SDXLDiffusionStepCount.ts';

import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import ImageURI from '@/library/customTypes/UniformResourceIdentifier/Data/Image/index.ts';

import DiscreteSlider from '@/components/DiscreteSlider.vue';
import NavigationPanel from '@/components/NavigationPanel.vue';

import TextToImageInputSection from '@/features/TextToImage/TextToImageInputSection.vue';
import type TextToImageInput from '@/features/TextToImage/models/TextToImageInput.ts';

import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

import ImageGenerationPromptWeight, {
  quantitative,
} from '@/models/ImageGenerationPromptWeight.ts';

const currentPrompt: Ref<ImageGenerationPrompt | null> = ref(null);

const {
  range,
} = SDXLDiffusionStepCount;

const currentNumberOfDiffusionSteps = ref<number>(range.midpoint);

const toTextPrompts = (
  givenPrompt: ImageGenerationPrompt,
  givenWeightQuality: 'positive' | 'negative',
): TextToImageInput['text'] => {
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
  const proposedPrompt = get(currentPrompt);

  if (proposedPrompt === null) throw new Error('Prompt was not set before submission');

  const textToImageResponse = await shimmedStabilityAIClient.version1.image.tryToGenerateFromText({
    engineId              : 'stable-diffusion-xl-1024-v1-0',
    textToImageRequestBody: {
      textPrompts: [
        ...toTextPrompts(proposedPrompt, 'positive'),
        ...toTextPrompts(proposedPrompt, 'negative'),
      ],
      height  : 1024,
      width   : 1024,
      steps   : get(currentNumberOfDiffusionSteps),
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
  const uriForNewImage = new ImageURI('png', 'base64', base64DataOfNewImage);

  return {
    uri        : uriForNewImage,
    description: proposedPrompt.positive,
  };
});
</script>

<template>
  <NavigationPanel>
    <VForm
      :disabled="imageGeneration.isInProgress"
      @submit.prevent="imageGeneration.try"
    >
      <TextToImageInputSection
        v-model="currentPrompt"
      />

      <br>

      <DiscreteSlider
        v-model="currentNumberOfDiffusionSteps"
        label="Number of Diffusion Steps"
        :range="range"
        :tick-step="10"
      />

      <br>

      <VBtn
        type="submit"
        :disabled="imageGeneration.isInProgress"
        block
      >
        {{
          imageGeneration.isInProgress
            ? 'Generating Image...'
            : 'Generate Image'
        }}
      </VBtn>
    </VForm>
  </NavigationPanel>

  <VMain>
    <VContainer
      fluid
      max-width="100vh"
      class="fill-height"
    >
      <VImg
        v-if="imageGeneration.result !== null"
        :src="imageGeneration.result.uri.serialized"
        :alt="imageGeneration.result.description"
      />
      <VSkeletonLoader
        v-else
        :boilerplate="!imageGeneration.isInProgress"
        width="100vh"
        :style="{
          'aspect-ratio': 1,
        }"
      />
    </VContainer>
  </VMain>
</template>

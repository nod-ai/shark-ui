<script setup lang="ts">
import {
  get,
  ref,
  type Ref,
} from '@/library/vue/reactivity.ts';
import {
  useStatefulAttemptThatEventually,
} from '@/library/vue/statefulAttempt';

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
  VMain,
} from 'vuetify/components/VMain';
import {
  VSkeletonLoader,
} from 'vuetify/components/VSkeletonLoader';

import SDXLDiffusionStepCount from '@/library/ShimmedStabilityAIClient/models/SDXLDiffusionStepCount.ts';

import DiscreteSlider from '@/components/DiscreteSlider.vue';
import NavigationPanel from '@/components/NavigationPanel.vue';

import TextToImageInputSection from '@/features/TextToImage/components/TextToImageInputSection.vue';
import TextToImageOutputImg from '@/features/TextToImage/components/TextToImageOutputImg.vue';
import * as TextToImage from '@/features/TextToImage/index.ts';

const currentPrompt: Ref<TextToImage.Input['text'] | null> = ref(null);

const {
  range,
} = SDXLDiffusionStepCount;

const currentNumberOfDiffusionSteps = ref<number>(range.midpoint);

const imageGeneration = useStatefulAttemptThatEventually(async (ends) => {
  const proposedPrompt = get(currentPrompt);

  if (
    proposedPrompt === null
  ) return ends.inFlamesBecause('Prompt was not set before submission');

  const outcomeOfGeneratingOutput = await TextToImage.Client.SDXL.generateOutputFrom({
    textToImageRequestBody: {
      textPrompts: proposedPrompt,
      height     : 1024,
      width      : 1024,
      steps      : get(currentNumberOfDiffusionSteps),
      cfgScale   : 7.5,
      seed       : 0,
    },
  });

  if (
    outcomeOfGeneratingOutput.isFailure
  ) return outcomeOfGeneratingOutput;

  const generatedOutput = outcomeOfGeneratingOutput.unwrapped;
  return ends.inSuccessWith(generatedOutput.image);
});
</script>

<template>
  <NavigationPanel>
    <VForm
      :disabled="imageGeneration.isInProgress"
      @submit.prevent="imageGeneration.initiate"
    >
      <TextToImageInputSection
        v-model="currentPrompt"
        label="Prompts"
        :positive="{
          label: 'Imagine...',
          placeholder: 'What would you like to see?',
        }"
        :negative="{
          label: 'Avoid...',
          placeholder: 'What should be avoided?',
        }"
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
      <VSkeletonLoader
        v-if="imageGeneration.outcome === null"
        :boilerplate="!imageGeneration.isInProgress"
        width="100vh"
        :style="{
          'aspect-ratio': 1,
        }"
      />
      <TextToImageOutputImg
        v-else
        :model-value="imageGeneration.outcome.forciblyUnwrap()"
      />
    </VContainer>
  </VMain>
</template>

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

import Attempt from '@/library/Attempt';

import SDXLDiffusionStepCount from '@/library/ShimmedStabilityAIClient/models/SDXLDiffusionStepCount.ts';

import NavigationPanel from '@/components/NavigationPanel.vue';
import TextToImageModelSettings from '@/components/TextToImageModelSettings.vue';

import TextToImageInputSection from '@/features/TextToImage/components/TextToImageInputSection.vue';
import * as TextToImage from '@/features/TextToImage/index.ts';

const currentPrompt: Ref<TextToImage.Input['text'] | null> = ref(null);

const {
  range,
} = SDXLDiffusionStepCount;

const currentNumberOfDiffusionSteps = ref<number>(range.midpoint);
const currentGuidanceScale = ref<number>(7.50);

const sliderProps = {
  label   : 'Number of Diffusion Steps',
  range   : range,
  tickStep: 10,
};

const guidanceScaleProps = {
  label    : 'Guidance scale for generation',
  min      : 0.00,
  max      : 20.00,
  precision: 2,
  step     : 0.5,
};

const imageGeneration = useStatefulProcess(async () => {
  const proposedPrompt = get(currentPrompt);

  if (
    proposedPrompt === null
  ) return Attempt.abandon('Prompt was not set before submission');

  const outcomeOfGeneratingOutput = await TextToImage.Client.SDXL.generateOutputFrom({
    textToImageRequestBody: {
      textPrompts: proposedPrompt,
      height     : 1024,
      width      : 1024,
      steps      : get(currentNumberOfDiffusionSteps),
      cfgScale   : get(currentGuidanceScale),
      seed       : 0,
    },
  });

  const generatedOutput = outcomeOfGeneratingOutput.forciblyUnwrap();
  return generatedOutput.image;
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

      <TextToImageModelSettings
        v-model:number-of-diffusion-steps="currentNumberOfDiffusionSteps"
        v-model:guidance-scale="currentGuidanceScale"
        label="Model Settings"
        :slider-props="sliderProps"
        :guidance-scale-props="guidanceScaleProps"
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

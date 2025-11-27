<script setup lang="ts">
import {
  get,
  ref,
  type Ref,
  progressiveRef,
} from '@/library/vue';

import {
  Effect,
  Option,
} from 'effect';

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

import {
  SDXL,
} from '@/library/ShimmedStabilityAIClient';

import NavigationPanel from '@/components/NavigationPanel.vue';
import TextToImageModelSettings from '@/components/TextToImageModelSettings.vue';

import TextToImage from '@/features/TextToImage';
import TextToImageInputSection from '@/features/TextToImage/components/TextToImageInputSection.vue';
import TextToImageOutputView from '@/features/TextToImage/components/TextToImageOutputView.vue';

const currentPrompt: Ref<Option.Option<TextToImage.Pipeline.Input['text']>> = ref(Option.none());

const {
  range,
} = SDXL.DiffusionStepCount;

const currentNumberOfDiffusionSteps = ref<number>(range.midpoint);
const currentGuidanceScale = ref<number>(7.50);

const diffusionStepProps = {
  label   : 'Number of Diffusion Steps',
  range   : range,
  tickStep: 10,
};

const guidanceScaleProps = {
  label    : 'Cfg Scale',
  min      : 0.00,
  max      : 20.00,
  precision: 2,
  step     : 0.5,
};

const imageGeneration = progressiveRef(Effect.gen(function* () {
  const proposedPrompt = yield* get(currentPrompt).pipe(
    Effect.orDieWith(() => new Error('Prompt was not set before submission')),
  );

  const generatedOutput = yield* TextToImage.Client.SDXL.generateOutputFrom({
    textToImageRequestBody: {
      textPrompts: proposedPrompt,
      height     : 1024,
      width      : 1024,
      steps      : get(currentNumberOfDiffusionSteps),
      cfgScale   : get(currentGuidanceScale),
      seed       : 0,
    },
  });

  return generatedOutput.image;
}));
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
        :diffusion-step-props="diffusionStepProps"
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
      <VSkeletonLoader
        v-if="Option.isNone(imageGeneration.output)"
        :boilerplate="!imageGeneration.isInProgress"
        width="100vh"
        :style="{
          'aspect-ratio': 1,
        }"
      />
      <TextToImageOutputView
        v-else
        :output="imageGeneration.output.value"
      />
    </VContainer>
  </VMain>
</template>

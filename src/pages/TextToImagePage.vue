<script setup lang="ts">
import {
  get,
  ref,
  type Ref,
  useStatefulAttemptThatEventually,
} from '@/library/vue';

import {
  Exit,
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

import DiscreteSlider from '@/components/DiscreteSlider.vue';
import NavigationPanel from '@/components/NavigationPanel.vue';

import TextToImage from '@/features/TextToImage';
import TextToImageInputSection from '@/features/TextToImage/components/TextToImageInputSection.vue';
import TextToImageOutputView from '@/features/TextToImage/components/TextToImageOutputView.vue';

const currentPrompt: Ref<Option.Option<TextToImage.Pipeline.Input['text']>> = ref(Option.none());

const {
  range,
} = SDXL.DiffusionStepCount;

const currentNumberOfDiffusionSteps = ref<number>(range.midpoint);

const imageGeneration = useStatefulAttemptThatEventually(async () => {
  const proposedPrompt = Option.getOrThrowWith(
    get(currentPrompt),
    () => new Error('Prompt was not set before submission'),
  );

  const exitFromGeneratingOutput = await TextToImage.Client.SDXL.generateOutputFrom({
    textToImageRequestBody: {
      textPrompts: proposedPrompt,
      height     : 1024,
      width      : 1024,
      steps      : get(currentNumberOfDiffusionSteps),
      cfgScale   : 7.5,
      seed       : 0,
    },
  });

  const exitFromGeneratingImage = Exit.map(
    exitFromGeneratingOutput,
    $0 => $0.image,
  );

  return exitFromGeneratingImage;
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
        v-if="Option.isNone(imageGeneration.result)"
        :boilerplate="!imageGeneration.isInProgress"
        width="100vh"
        :style="{
          'aspect-ratio': 1,
        }"
      />
      <TextToImageOutputView
        v-else
        :output="imageGeneration.result.value"
      />
    </VContainer>
  </VMain>
</template>

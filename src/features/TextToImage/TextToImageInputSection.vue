<script setup lang="ts">
import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';

import {
  watch,
} from 'vue';
import {
  VCard,
} from 'vuetify/components/VCard';
import {
  VTextarea,
} from 'vuetify/components/VTextarea';

import {
  cloneOf,
} from '@/library/utilitiesByType/reference.ts';

import type TextToImageInput from './models/TextToImageInput.ts';

import type ImageGenerationPrompt from '@/models/ImageGenerationPrompt.ts';

import ImageGenerationPromptWeight, {
  quantitative,
} from '@/models/ImageGenerationPromptWeight.ts';

const exposedPrompt = defineModel<TextToImageInput['text'] | null>({
  required: true,
});

type QualitativeTextWeight = 'positive' | 'negative';

const toValueOfInputTextByQualitativeWeight = (
  givenInputText: TextToImageInput['text'],
  givenWeightQuality: QualitativeTextWeight,
): ImageGenerationPrompt[QualitativeTextWeight] => {
  const derivedWeight = ImageGenerationPromptWeight[givenWeightQuality];

  return cloneOf(givenInputText)
    .filter($0 => $0.weight === quantitative(derivedWeight))
    .map($0 => $0.text.trim())
    .join(', ');
};

const asInputTextByQualitativeWeight = (givenPrompt: TextToImageInput['text']): ImageGenerationPrompt => ({
  positive: toValueOfInputTextByQualitativeWeight(givenPrompt, 'positive'),
  negative: toValueOfInputTextByQualitativeWeight(givenPrompt, 'negative'),
});

const toElementOfInputText = (
  givenPrompt: ImageGenerationPrompt,
  givenWeightQuality: QualitativeTextWeight,
): TextToImageInput['text'][number] => {
  const derivedWeight = ImageGenerationPromptWeight[givenWeightQuality];

  return {
    text  : givenPrompt[givenWeightQuality],
    weight: quantitative(derivedWeight),
  };
};

const asInputText = (givenPrompt: ImageGenerationPrompt): TextToImageInput['text'] => [
  toElementOfInputText(givenPrompt, 'positive'),
  toElementOfInputText(givenPrompt, 'negative'),
];

const defaultInitialPrompt: ImageGenerationPrompt = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const initialPrompt: ImageGenerationPrompt = (() => {
  const initialExposedPrompt = get(exposedPrompt);

  if (
    initialExposedPrompt === null
  ) return defaultInitialPrompt;

  return asInputTextByQualitativeWeight(initialExposedPrompt);
})();

const currentPrompt: Ref<ImageGenerationPrompt> = ref(initialPrompt);

watch(
  currentPrompt,
  (updatedPrompt) => {
    set(exposedPrompt, asInputText(updatedPrompt));
  },
  {
    deep     : true,
    immediate: true,
  },
);
</script>

<template>
  <VCard
    subtitle="Prompts"
  >
    <template #text>
      <VTextarea
        v-model="currentPrompt.positive"
        label="Imagine..."
        placeholder="What would you like to see?"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />

      <br>

      <VTextarea
        v-model="currentPrompt.negative"
        label="Avoid..."
        placeholder="What should be avoided?"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />
    </template>
  </VCard>
</template>

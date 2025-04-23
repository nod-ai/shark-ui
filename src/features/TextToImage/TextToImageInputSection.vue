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

const exposedPrompt = defineModel<TextToImageInput['text'] | null>({
  required: true,
});

type QualitativeTextWeight = 'positive' | 'negative';

type QuantitativeTextWeight = 1 | -1;

interface InputTextByQualitativeWeight {
  positive: string;
  negative: string;
}

const quantitative = (givenQualitativeWeight: QualitativeTextWeight): QuantitativeTextWeight => {
  switch (givenQualitativeWeight) {
    case 'positive': return +1;
    case 'negative': return -1;
  }
};

const toValueOfInputTextByQualitativeWeight = (
  givenInputText: TextToImageInput['text'],
  givenWeightQuality: QualitativeTextWeight,
): InputTextByQualitativeWeight[QualitativeTextWeight] => {
  return cloneOf(givenInputText)
    .filter($0 => $0.weight === quantitative(givenWeightQuality))
    .map($0 => $0.text.trim())
    .join(', ');
};

const asInputTextByQualitativeWeight = (givenPrompt: TextToImageInput['text']): InputTextByQualitativeWeight => ({
  positive: toValueOfInputTextByQualitativeWeight(givenPrompt, 'positive'),
  negative: toValueOfInputTextByQualitativeWeight(givenPrompt, 'negative'),
});

const toElementOfInputText = (
  givenPrompt: InputTextByQualitativeWeight,
  givenWeightQuality: QualitativeTextWeight,
): TextToImageInput['text'][number] => {
  return {
    text  : givenPrompt[givenWeightQuality],
    weight: quantitative(givenWeightQuality),
  };
};

const asInputText = (givenPrompt: InputTextByQualitativeWeight): TextToImageInput['text'] => [
  toElementOfInputText(givenPrompt, 'positive'),
  toElementOfInputText(givenPrompt, 'negative'),
];

const defaultInitialPrompt: InputTextByQualitativeWeight = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const initialPrompt: InputTextByQualitativeWeight = (() => {
  const initialExposedPrompt = get(exposedPrompt);

  if (
    initialExposedPrompt === null
  ) return defaultInitialPrompt;

  return asInputTextByQualitativeWeight(initialExposedPrompt);
})();

const currentPrompt: Ref<InputTextByQualitativeWeight> = ref(initialPrompt);

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

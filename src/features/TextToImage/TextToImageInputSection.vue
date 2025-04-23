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

const exposedInputText = defineModel<TextToImageInput['text'] | null>({
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

const asInputTextByQualitativeWeight = (givenInputText: TextToImageInput['text']): InputTextByQualitativeWeight => ({
  positive: toValueOfInputTextByQualitativeWeight(givenInputText, 'positive'),
  negative: toValueOfInputTextByQualitativeWeight(givenInputText, 'negative'),
});

const toElementOfInputText = (
  givenInputText: InputTextByQualitativeWeight,
  givenWeightQuality: QualitativeTextWeight,
): TextToImageInput['text'][number] => {
  return {
    text  : givenInputText[givenWeightQuality],
    weight: quantitative(givenWeightQuality),
  };
};

const asInputText = (givenInputText: InputTextByQualitativeWeight): TextToImageInput['text'] => [
  toElementOfInputText(givenInputText, 'positive'),
  toElementOfInputText(givenInputText, 'negative'),
];

const defaultInitialInputText: InputTextByQualitativeWeight = {
  positive: 'a cat under the snow with blue eyes, covered by snow, cinematic style, medium shot, professional photo, animal',
  negative: 'Watermark, blurry, over-saturated, low resolution, pollution',
};

const initialInputText: InputTextByQualitativeWeight = (() => {
  const initialExposedInputText = get(exposedInputText);

  if (
    initialExposedInputText === null
  ) return defaultInitialInputText;

  return asInputTextByQualitativeWeight(initialExposedInputText);
})();

const currentInputText: Ref<InputTextByQualitativeWeight> = ref(initialInputText);

watch(
  currentInputText,
  (updatedInputText) => {
    set(exposedInputText, asInputText(updatedInputText));
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
        v-model="currentInputText.positive"
        label="Imagine..."
        placeholder="What would you like to see?"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />

      <br>

      <VTextarea
        v-model="currentInputText.negative"
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

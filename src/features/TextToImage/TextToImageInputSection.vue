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

const serialized = (
  givenInputText: TextToImageInput['text'],
  given: {
    weight: QualitativeTextWeight;
  },
): InputTextByQualitativeWeight[QualitativeTextWeight] => {
  return cloneOf(givenInputText)
    .filter($0 => $0.weight === quantitative(given.weight))
    .map($0 => $0.text.trim())
    .join(', ');
};

const byQualitativeWeight = (givenInputText: TextToImageInput['text']): InputTextByQualitativeWeight => ({
  positive: serialized(givenInputText, {
    weight: 'positive',
  }),
  negative: serialized(givenInputText, {
    weight: 'negative',
  }),
});

const standardizedElement = (
  givenInputText: InputTextByQualitativeWeight,
  given: {
    weight: QualitativeTextWeight;
  },
): TextToImageInput['text'][number] => {
  return {
    text  : givenInputText[given.weight],
    weight: quantitative(given.weight),
  };
};

const standardized = (givenInputText: InputTextByQualitativeWeight): TextToImageInput['text'] => [
  standardizedElement(givenInputText, {
    weight: 'positive',
  }),
  standardizedElement(givenInputText, {
    weight: 'negative',
  }),
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

  return byQualitativeWeight(initialExposedInputText);
})();

const currentInputText: Ref<InputTextByQualitativeWeight> = ref(initialInputText);

watch(
  currentInputText,
  (updatedInputText) => {
    set(exposedInputText, standardized(updatedInputText));
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

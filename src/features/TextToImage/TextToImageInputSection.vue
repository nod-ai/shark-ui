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

type StandardizedInputText = TextToImageInput['text'];

const exposedInputText = defineModel<StandardizedInputText | null>({
  required: true,
});

interface InputTextFieldProps {
  label: string;
  placeholder: string;
}

defineProps<{
  label: string;
  positive: InputTextFieldProps;
  negative: InputTextFieldProps;
}>();

const qualitativeToQuantitativeTextWeightMap = {
  positive: 1,
  negative: -1,
} as const;

type QualitativeToQuantitativeTextWeightMap = typeof qualitativeToQuantitativeTextWeightMap;

type QualitativeTextWeight = keyof QualitativeToQuantitativeTextWeightMap;

type QuantitativeTextWeight = QualitativeToQuantitativeTextWeightMap[QualitativeTextWeight];

interface InputTextByQualitativeWeight {
  positive: string;
  negative: string;
}

const quantitative = (givenQualitativeWeight: QualitativeTextWeight): QuantitativeTextWeight => {
  return qualitativeToQuantitativeTextWeightMap[givenQualitativeWeight];
};

const serialized = (
  givenInputText: StandardizedInputText,
  given: {
    weight: QuantitativeTextWeight;
  },
): InputTextByQualitativeWeight[QualitativeTextWeight] => {
  return cloneOf(givenInputText)
    .filter($0 => $0.weight === given.weight)
    .map($0 => $0.text.trim())
    .join(', ');
};

const byQualitativeWeight = (givenInputText: StandardizedInputText): InputTextByQualitativeWeight => {
  const entriesForInputTextByQualitativeWeight = Object.entries(qualitativeToQuantitativeTextWeightMap)
    .map(([eachQualitativeWeight, eachQuantitativeWeight]) => {
      const eachSerializationByWeight = serialized(givenInputText, {
        weight: eachQuantitativeWeight,
      });

      return [
        eachQualitativeWeight as QualitativeTextWeight,
        eachSerializationByWeight,
      ] as const;
    });

  return Object.fromEntries(entriesForInputTextByQualitativeWeight) as unknown as InputTextByQualitativeWeight;
};

const standardizedElement = (
  givenInputText: InputTextByQualitativeWeight,
  given: {
    weight: QualitativeTextWeight;
  },
): StandardizedInputText[number] => {
  return {
    text  : givenInputText[given.weight],
    weight: quantitative(given.weight),
  };
};

const standardized = (givenInputText: InputTextByQualitativeWeight): StandardizedInputText => [
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
    :subtitle="label"
  >
    <template #text>
      <VTextarea
        v-model="currentInputText.positive"
        :label="positive.label"
        :placeholder="positive.placeholder"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />

      <br>

      <VTextarea
        v-model="currentInputText.negative"
        :label="negative.label"
        :placeholder="negative.placeholder"
        rows="3"
        auto-grow
        max-rows="10"
        hide-details
      />
    </template>
  </VCard>
</template>
